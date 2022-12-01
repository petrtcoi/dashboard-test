import * as R from 'ramda'
import { WorksState } from '..'
import { ActionStatus, VisibilityStatus, WorkId, WorkMeta, WorkStatus } from '../../../../typescript/work.type'

const isNotNil = R.complement(R.isNil)

export const updateSuperStatusDownfall = (workId: WorkId | undefined, state: WorksState): WorksState => {

  const superStatusLens = R.lensPath(['metaById', workId || '_trash', 'superStatus'])
  const childNode = state.metaById[workId as WorkId]?.firstChildNode 
  const nextNode = state.metaById[workId as WorkId]?.nextNode

  return R.pipe(
    R.ifElse(
      () => R.isNil(workId),
      () => state,
      R.pipe(
        () => getSelfSuperStatus(workId as WorkId, state),
        R.ifElse(
          R.isNil,
          () => state,
          R.pipe(
            (superStatus) => R.set(superStatusLens, superStatus, state) as WorksState,
            (state) => updateSuperStatusDownfall(nextNode, state),
            (state) => updateSuperStatusDownfall(childNode, state),
          )
        )
      )
    )
  )()
}



/**
 * Определяем собственный SuperStatus
 */
export const getSelfSuperStatus = (workId: WorkId, state: WorksState) => {
  const meta = state.metaById[workId]
  return R.pipe(
    () => meta,
    R.ifElse(
      R.isNil,
      () => undefined,
      R.or(
        () => getPrevNodeSuperStatus(meta, state),
        () => extractSuperStatusFromParent(meta, state)
      )
    )
  )()
}


export const getPrevNodeSuperStatus = (meta: WorkMeta, state: WorksState) => {
  if (!meta.prevNode) return
  return state.metaById[meta.prevNode]?.superStatus || undefined
}

export const extractSuperStatusFromParent = (meta: WorkMeta, state: WorksState) => {
  if (!meta.parentNode) return
  const parentMeta = state.metaById[meta.parentNode]
  return R.pipe(
    () => parentMeta.superStatus,
    R.set(R.lensPath(['status', 'action']), extractParentAction(parentMeta)),
    R.set(R.lensPath(['status', 'drawBetweenUpperSiblings']), extractDrawSiblingsLines(parentMeta)),
  )()
}



export const extractParentAction = (parentMeta: WorkMeta) => {
  return R.cond([
    [R.always(parentMeta.status?.action !== ActionStatus.Idle), () => parentMeta.status.action],
    [R.always(parentMeta.superStatus?.action !== ActionStatus.Idle), () => parentMeta.superStatus.action],
    [R.always(true), R.always(ActionStatus.Idle)]
  ])()
}

export const extractDrawSiblingsLines = (parentMeta: WorkMeta) => {
  return R.ifElse(
    R.anyPass([
      () => isNotNil(parentMeta.nextNode),
      () => parentMeta.superStatus.drawBetweenUpperSiblings === true
    ]),
    R.always(true),
    R.always(false)
  )()
}



const getDefaultStatus = (): WorkStatus => {
  return {
    visibility: VisibilityStatus.Expanded,
    action: ActionStatus.Idle,
    drawBetweenUpperSiblings: false,
  }
}