import { createAsyncThunk } from "@reduxjs/toolkit"
import * as R from 'ramda'
import * as api from './../../../../api/'

import { WorksState } from ".."
import { WorkGetListDto, WorkGetDto, castWorkDto, WorkStatus, VisibilityStatus, ActionStatus, WorkMeta, WorkId } from '../../../../typescript/work.type'



type ApiData = { dto: WorkGetListDto }

export type FetchAllWorksResult = Required<Pick<WorksState, 'workById' | 'metaById' | 'rootWorkId' | 'errorLogs'>>


export const fetchAllWorks = createAsyncThunk<Promise<FetchAllWorksResult>>(
  'works/fetchAll',
  async () => {
    const apiData = await api.works.getList()
    try {
      return R.pipe(
        getApiData,
        getWorksById,
        getMetaById,
        getRootWorkId,
        removeDto
      )(apiData)
    } catch (err) {
      throw err
    }
  }
)


/** Переводим ответ от Api в объект {dto: ...} для дальнейшей работы */
function getApiData(data: WorkGetListDto): ApiData {
  return { dto: data }
}



/**
 * Получаем объект workById для State
 */
function getWorksById(props: ApiData): ApiData & Pick<WorksState, 'workById'> {
  return {
    ...props,
    workById:
      props.dto
        .reduce((acc: Pick<WorksState, 'workById'>, workDto) => {
          return {
            ...acc,
            ...getWork(workDto, Object.create(null))
          }
        }, Object.create(null))
  }
}

function getWork(workDto: WorkGetDto, workById: WorksState['workById']): WorksState['workById'] {
  return {
    [workDto.id]: castWorkDto(workDto),
    ...workById,
    ...(workDto.child || [])
      .reduce((acc: WorksState['workById'], workDto) => {
        return getWork(workDto, acc)
      }, Object.create(null))
  }
}


/**
 * Получаем объект metaById для State
 */
function getMetaById(props: ApiData & Pick<WorksState, 'workById'>): ApiData & Pick<WorksState, 'workById' | 'metaById'> {
  const metaById = scanWorkList({ list: props.dto, nestingLevel: 1, parentWork: undefined })
  return {
    ...props,
    metaById
  }
}


type ScanWorkListProps = { list: WorkGetDto[], nestingLevel: WorkMeta['nestingLevel'], parentWork?: WorkId }

function scanWorkList(props: ScanWorkListProps): WorksState['metaById'] {
  return props.list.reduce((acc: WorksState['metaById'], work, index, workList) => {

    return ({
      ...acc,
      [work.id]: {
        nestingLevel: props.nestingLevel,
        status: defaultWorkStatus,
        parentNode: index === 0 ? props.parentWork : undefined,
        prevNode: workList[index - 1]?.id || undefined,
        nextNode: workList[index + 1]?.id || undefined,
        firstChildNode: work.child[0]?.id || undefined,
        superStatus: {
          ...defaultWorkStatus,
          drawBetweenUpperSiblings: acc[work.id]?.nextNode ? true : false
        }
      },
      ...scanWorkList({ list: work.child, nestingLevel: props.nestingLevel + 1, parentWork: work.id })
    })

  }, Object.create(null))
}

const defaultWorkStatus: WorkStatus = {
  visibility: VisibilityStatus.Expanded,
  action: ActionStatus.Idle,
  drawBetweenUpperSiblings: false,
  initChange: false,
}




/** Получаем ID корневой работы - это самая первая из массива */
function getRootWorkId(props: ApiData & Pick<WorksState, 'workById' | 'metaById'>): ApiData & FetchAllWorksResult {

  const rootWork = props.dto[0]
  const meta = props.metaById[rootWork.id]
  if (meta.prevNode) throw Error('Ошибка в обработке ответа с сервера: не верно определена rootWork')
  return {
    ...props,
    rootWorkId: rootWork.id,
    errorLogs: []
  }
}

/** Удалем лишнее */
const removeDto = R.omit(['dto'])



