import * as R from 'ramda'
import { WorksState } from '..'
import { ActionStatus, VisibilityStatus, WorkId, WorkMeta, WorkStatus } from '../../../../typescript/work.type'

const isNotNil = R.complement(R.isNil)


/**
 * Устанавливает SuperStatus для Work
 * и рекурсивно вызывает себя для NextNode и FirstChildNode
 */
export const updateSuperStatusDownfall = R.curry(_updateSuperStatusDownfall)
function _updateSuperStatusDownfall(workId: WorkId | undefined, state: WorksState): WorksState {

  const superStatusLens = R.lensPath(['metaById', workId || '_trash', 'superStatus'])
  const childNode = state.metaById[workId as WorkId]?.firstChildNode
  const nextNode = state.metaById[workId as WorkId]?.nextNode

  return R.pipe(
    R.always(workId),
    R.ifElse(
      R.isNil,
      R.always(state),
      R.pipe(
        getSelfSuperStatus(state),
        R.ifElse(
          R.isNil,
          R.always(state),
          (superStatus) => R.set(superStatusLens, superStatus, state) as WorksState
        ),
        R.pipe(
          R.tap(console.log),
          (state) => updateSuperStatusDownfall(nextNode as WorkId, state),
          (state) => updateSuperStatusDownfall(childNode as WorkId, state),
        ),
      )
    ),
  )()
}



/**
 * Определяет свой SuperStatus
 */
export const getSelfSuperStatus = R.curry(_getSelfSuperStatus)
function _getSelfSuperStatus(state: WorksState, workId: WorkId): WorkStatus | undefined {

  const meta = state.metaById[workId]
  return R.pipe(
    R.always(meta),
    R.cond([
      [R.isNil, R.always(undefined)],
      [extractSuperStatusFromParent(state), extractSuperStatusFromParent(state)],
      [getPrevNodeSuperStatus(state), getPrevNodeSuperStatus(state)],
      [R.T, R.always(undefined)]
    ]),
  )() as WorkStatus | undefined
}


/**
 * Копирует SuperStatus из PrevNode
 */
export const getPrevNodeSuperStatus = R.curry(_getPrevNodeSuperStatus)
function _getPrevNodeSuperStatus(state: WorksState, meta: WorkMeta):  WorkStatus | undefined {

  if (!meta.prevNode) return undefined
  return state.metaById[meta.prevNode]?.superStatus || undefined
}


/**
 * Получает SuperStatus на основе Status / SuperStatus у ParentNode
 */
export const extractSuperStatusFromParent = R.curry(_extractSuperStatusFromParent)
function _extractSuperStatusFromParent(state: WorksState, meta: WorkMeta): WorkStatus | undefined {

  if (!meta.parentNode) return undefined
  const parentMeta = state.metaById[meta.parentNode]

  return R.pipe(
    R.always(parentMeta.superStatus),
    R.set(R.lensPath(['action']), extractParentAction(parentMeta)),
    R.set(R.lensPath(['drawBetweenUpperSiblings']), extractDrawSiblingsLines(parentMeta)),
  )()
}



/**
 * Получает status.action на основе ParentMeta
 */
export const extractParentAction = (parentMeta: WorkMeta) => {
  return R.cond([
    [R.always(parentMeta.status?.action !== ActionStatus.Idle), () => parentMeta.status.action],
    [R.always(parentMeta.superStatus?.action !== ActionStatus.Idle), () => parentMeta.superStatus.action],
    [R.always(true), R.always(ActionStatus.Idle)]
  ])()
}


/**
 * Определяет, нужно ли рисовыть линию для связи parentNode с NextNode
 */
export const extractDrawSiblingsLines = (parentMeta: WorkMeta) => {
  return R.anyPass([
    () => isNotNil(parentMeta.nextNode),
    () => parentMeta.superStatus.drawBetweenUpperSiblings === true
  ])()
}



