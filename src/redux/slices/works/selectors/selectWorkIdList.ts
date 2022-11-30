import * as R from 'ramda'
import { WorksState } from '..'
import { WorkId } from '../../../../typescript/work.type'
import { RootState } from '../../../store'


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


function addWork(workId: WorkId | undefined, list: WorkId[], metaById: WorksState['metaById']): WorkId[] {
  if (!workId || !metaById[workId]) return list
  const workMeta = metaById[workId]
  return [
    ...list,
    workId,
    ...addWork(workMeta.firstChildNode, [], metaById),
    ...addWork(workMeta.nextNode, [], metaById)
  ]
}

