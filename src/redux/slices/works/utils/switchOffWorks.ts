import * as R from 'ramda'
import { ActionStatus } from '../../../../typescript/work.type'
import { WorksState } from '../index'
import { deleteFromState } from './deleteFromState'

/**
 * Удаляет Work в процессе задания и 
 * переводит остальные задачи в режим Idle
 */
export const switchOffWorks = (state: WorksState) => {
  return R.pipe(
    R.always(state),
    removeAllCreatingWorks,
    setAllStatusToIdle,
  )()
}


/**
 * Удаляет все задачи, имеющие статус Creating (в процессе создания)
 */
export const removeAllCreatingWorks = (state: WorksState) => {
  return Object.keys(state.workById)
    .reduce((acc: WorksState, workId) => {
      if (state.metaById[workId as any].status.action !== ActionStatus.Creating) return acc
      return deleteFromState(acc, workId as any)
    }, state)
}


/**
 * Переводмт все Work в режим Idle
 */
export const setAllStatusToIdle = (state: WorksState) => {

  return Object.keys(state.workById)
    .reduce((acc: WorksState, workId) => {
      const actionLens = R.lensPath(['metaById', workId, 'status', 'action'])
      return R.set(actionLens, ActionStatus.Idle, acc)
    }, state)
}

