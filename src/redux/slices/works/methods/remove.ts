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
  const byIdList = current(state.byId)
  const work = byIdList[workId]
  if (!work) throw new Error('Не получилось найти работу')
  const toDeleteIds = getChildIds(work.id, byIdList)
  console.log(workId, toDeleteIds)
  state.ids = state.ids.filter(x => !([...toDeleteIds, workId].includes(x)))
  toDeleteIds.forEach(toDeleteId => { delete state.byId[toDeleteId] })

  return state
}




function getChildIds(childId: WorkId, byIdList: WorksState['byId']): WorkId[] {
  const childNode = byIdList[childId]
  if (!childNode) return []
  return [childNode.id, ...childNode._meta_.childNodes.map(id => getChildIds(id, byIdList))].flat()
} 
