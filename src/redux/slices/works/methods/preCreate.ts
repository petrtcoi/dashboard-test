import { current, PayloadAction } from "@reduxjs/toolkit"
import { WorksState } from ".."
import { WorkId, WorkLevel, WorkParentId } from "../../../../typescript/work.type"
import { getEmptyWork } from "../utils/getEmptyWork"

export const preCreate = (
  state: WorksState,
  action: PayloadAction<{
    prevNode: WorkId,
    nextNode: WorkId | null,
    parentId: WorkParentId,
    level: WorkLevel
  }>
) => {
  let work = getEmptyWork(action.payload)
  const idList = current(state.ids)

  if (action.payload.nextNode === null) {
    const prevNodeIndex = idList.findIndex(x => ((x === action.payload.prevNode)))
    const byIdObject = current(state.byId)
    const prevNodeLevel = byIdObject[action.payload.prevNode]._meta_.level
    const nextSibligIndex = idList.findIndex((x, index) => {
      if (index < prevNodeIndex) return false
      return byIdObject[x]._meta_.level === prevNodeLevel
    })
    if (nextSibligIndex === -1) {
      state.ids.push(work.id)
    } else {
      state.ids.splice(nextSibligIndex + 1, 0, work.id)
    }

  } else {
    const insertBeforeIndex = idList.findIndex(x => ((x === action.payload.nextNode)))
    state.ids.splice(insertBeforeIndex, 0, work.id)
  }

  state.byId[work.id] = work
  state.byId[action.payload.prevNode]._meta_.nextNode = work.id
}

