import { createAsyncThunk } from "@reduxjs/toolkit"
import * as R from 'ramda'

import * as api from './../../../../api/'

import { WorksState } from ".."
import { WorkGetListDto, WorkGetDto, castWorkDto, WorkStatus, VisibilityStatus, ActionStatus } from '../../../../typescript/work.type'


type ApiData = { dto: WorkGetListDto }

export type FetchAllWorksResult = Required<Pick<WorksState, 'workById' | 'metaById' | 'rootWorkId'>>

export const fetchAllWorks = createAsyncThunk<Promise<FetchAllWorksResult>>(
  'works/fetchAll',
  async () => {
    const apiData = await api.works.getList()
    return R.pipe(
      getApiData,
      getWorksById,
      getMetaById,
      getRootWorkId,
      removeDto
    )(apiData)

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
  const metaById = scanWorkForMeta(props.dto[0], Object.create(null))
  return {
    ...props,
    metaById
  }
}


function scanWorkForMeta(workDto: WorkGetDto, metaById: WorksState['metaById']): WorksState['metaById'] {
  const { child, id: workId } = workDto
  let updatedMeta = { ...metaById }

  if (!child || child.length === 0) return updatedMeta

  /** Ставим уровни вложенности */
  const workLevel = metaById[workId]?.nestingLevel || 1
  const childLevel = workLevel + 1

  /** Устанавливаем связи среди "детей" работы */
  return child.reduce((meta, childWork, index) => {
    return scanWorkForMeta(
      childWork,
      {
        ...meta,
        [childWork.id]: {
          ...updatedMeta[childWork.id],
          nestingLevel: childLevel,
          parentNode: index === 0 ? workId : undefined,
          prevNode: child[index - 1]?.id || undefined,
          nextNode: child[index + 1]?.id || undefined
        }
      }
    )
  }, {
    ...updatedMeta,

    /** Прописываем связь между родительской и дочерней работой  */
    [workId]: {
      ...updatedMeta[workId],
      firstChildNode: child[0].id,
      nestingLevel: workLevel,
      status: defaultWorkStatus,
      soakingStatus: defaultWorkStatus
    },
    [child[0].id]: {
      ...updatedMeta[child[0].id],
      parentNode: workId,
      nestingLevel: childLevel
    }
  })
}


const defaultWorkStatus: WorkStatus = {
  visibility: VisibilityStatus.Expanded,
  action: ActionStatus.Idle,
  drawFoldersTreeLines: { 1: false, 2: false }
}


/** Получаем ID корневой работы - это самая первая из массива */
function getRootWorkId(props: ApiData & Pick<WorksState, 'workById' | 'metaById'>): ApiData & FetchAllWorksResult {

  const rootWork = props.dto[0]
  const meta = props.metaById[rootWork.id]
  if (meta.prevNode) throw Error('Ошибка в обработке ответа с сервера: не верно определена rootWork')
  return {
    ...props,
    rootWorkId: rootWork.id
  }
}

/** Удалем лишнее */
const removeDto = R.omit(['dto'])