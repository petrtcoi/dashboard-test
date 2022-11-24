import { current, PayloadAction } from "@reduxjs/toolkit"
import { WorksState } from ".."
import { getNextLevel, isWorkLevelCorrect, WorkId, WorkLevel, WorkMeta, WorkParentId, WorkStatus, SomeWorkLevel } from '../../../../typescript/work.type'
import { getEmptyWork, GetEmptyWorkProps } from "../utils/getEmptyWork"

export type CreateMode = 'sibling' | 'child'
export const preCreate = (
  state: WorksState,
  action: PayloadAction<{
    initWorkId: WorkId | null
    createType: CreateMode
  }>
) => {
  const props = action.payload
  const currState = current(state)

  let newWorkMeta: WorkMeta

  if (props.initWorkId === null) {
    const newWorkMeta: GetEmptyWorkProps = {
      level: 1,
      parentNode: props.initWorkId,
      prevNode: null,
      nextNode: null
    }
    const newWork = getEmptyWork(newWorkMeta)
    state.byId[newWork.id] = newWork
    return
  }

  const initWork = currState.byId[props.initWorkId]

  if (props.createType === 'sibling') {


    const newWorkMeta: GetEmptyWorkProps = {
      level: initWork._meta_.level,
      parentNode: initWork._meta_.parentNode,
      prevNode: initWork.id,
      nextNode: initWork._meta_.nextNode
    }
    const newWork = getEmptyWork(newWorkMeta)
    state.byId[newWork.id] = newWork
    state.byId[props.initWorkId]._meta_.nextNode = newWork.id


    if (initWork._meta_.parentNode !== null) {
      const childNodes = currState.byId[initWork._meta_.parentNode]._meta_.childNodes
      const initWorkIndex = childNodes.findIndex(x => x === initWork.id)
      state.byId[initWork._meta_.parentNode]._meta_.childNodes
        .splice(initWorkIndex + 1, 0, newWork.id)
    }
    if (initWork._meta_.nextNode !== null) {
      state.byId[initWork._meta_.nextNode]._meta_.prevNode = newWork.id
    }
  }

  if (props.createType === 'child') {

    const nextLevel = getNextLevel(initWork._meta_.level)
    if (!isWorkLevelCorrect(nextLevel)) return

    const newWorkMeta: GetEmptyWorkProps = {
      level: nextLevel,
      parentNode: initWork.id,
      prevNode: null,
      nextNode: initWork._meta_.childNodes[0] ?? null
    }
    const newWork = getEmptyWork(newWorkMeta)
    state.byId[newWork.id] = newWork
    state.byId[initWork.id]._meta_.childNodes.unshift(newWork.id)
    if (initWork._meta_.childNodes[0]) {
      state.byId[initWork._meta_.childNodes[0]]._meta_.prevNode = newWork.id
    }
  }


}