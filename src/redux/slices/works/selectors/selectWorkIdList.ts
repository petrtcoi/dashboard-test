import * as R from 'ramda'
import { WorksState } from '..'
import { WorkId } from '../../../../typescript/work.type'
import { RootState } from '../../../store'

export const selectWo = (state: RootState) => state.works.metaById

/**
 * Получаем список ID работ, развернутый в порядка: сначала дети (child), потом siblings (nextNode)
 * Возвращаем пустой массив, если почему-то нет rootNodeId
 */
export const selectWorkIdList = (state: RootState) => {
  const rootWorkId = state.works.rootWorkId
  return (
    R.ifElse(
      R.always(R.isNil(rootWorkId)),
      R.always([]),
      // @ts-ignore
      R.always(addWork(rootWorkId, [], state.works.metaById))
    )()
  )
}


function addWork(workId: WorkId, list: WorkId[], metaById: WorksState['metaById']): WorkId[] {
  const meta = metaById[workId]
  if (!meta) return list

  const nextNode = meta.firstChildNode || meta.nextNode || undefined
  const newList = [...list, workId]
  return !nextNode
    ? newList
    : addWork(nextNode, newList, metaById)
}

