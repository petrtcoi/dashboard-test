import { createAsyncThunk } from "@reduxjs/toolkit"
import { current } from "@reduxjs/toolkit"
import * as api from './../../../../api'

import { WorksState } from ".."
import { WorkId } from "../../../../typescript/work.type"

export const removeWork = createAsyncThunk(
  'works/remove',
  async (workId: WorkId) => {
    if (workId >= 0) await api.row.remove(workId)
    return workId
  }

)


export const removeWorkWithChild = (
  state: WorksState,
  workId: WorkId
) => {
  const currState = current(state)
  const work = currState.byId[workId]
  if (!work) throw new Error('Не получилось найти работу')
  
  const childsToDelete = getChildIds(work.id, currState.byId)

  if (work._meta_.prevNode) {
    const prevWork = currState.byId[work._meta_.prevNode]
    state.byId[prevWork.id]._meta_.nextNode = work._meta_.nextNode ?? null
  }
  if (work._meta_.nextNode) {
    const nextWork = currState.byId[work._meta_.nextNode]
    state.byId[nextWork.id]._meta_.prevNode = work._meta_.prevNode ?? null
  }
  if (work._meta_.parentNode) {
    const parentWork = currState.byId[work._meta_.parentNode]
    state.byId[parentWork.id]._meta_.childNodes =
      parentWork._meta_.childNodes
        .filter(x => x !== work.id)
  }

}



function getChildIds(childId: WorkId, byIdList: WorksState['byId']): WorkId[] {
  const childNode = byIdList[childId]
  if (!childNode) return []
  return [...childNode._meta_.childNodes.map(id => getChildIds(id, byIdList))].flat()
} 
