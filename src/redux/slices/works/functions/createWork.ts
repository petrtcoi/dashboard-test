import { createAsyncThunk, current } from '@reduxjs/toolkit'
import * as api from '../../../../api'

import { WorkCreateDto, WorkId } from '../../../../typescript/work.type'
import { WorksState } from ".."

export const createWork = createAsyncThunk(
  'works/create',
  async (work: WorkCreateDto) => {
    const result = await api.row.create(work)
    return {oldId: work.id, result}
  }
)


export const hangleChangeId = (state: WorksState, oldId: WorkId, newId: WorkId) => {

  const currState = current(state)
  const work = currState.byId[oldId]
  if (!work) return 

  if (work._meta_.nextNode) {
    state.byId[work._meta_.nextNode]._meta_.prevNode = newId
  }
  if (work._meta_.prevNode) {
    state.byId[work._meta_.prevNode]._meta_.nextNode = newId
  }
  if (work._meta_.parentNode) {
    const childNodes = currState.byId[work._meta_.parentNode]._meta_.childNodes
    state.byId[work._meta_.parentNode]._meta_.childNodes = childNodes.map(x => {
      if (x !== oldId) return x
      return newId
    })
  }
  if (work._meta_.childNodes) {
    work._meta_.childNodes.forEach((childId) => {
      state.byId[childId]._meta_.parentNode = newId
    })
  }

  state.byId[oldId].id = newId
  state.byId[newId] = state.byId[oldId]
  delete state.byId[oldId]

}