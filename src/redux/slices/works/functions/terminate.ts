import { createAsyncThunk } from "@reduxjs/toolkit"
import { current } from "@reduxjs/toolkit"
import * as api from '../../../../api'

import { WorksState } from ".."
import { WorkId, WorkStatus } from "../../../../typescript/work.type"

export const removeWork = createAsyncThunk(
  'works/remove',
  async (workId: WorkId) => {
    if (workId >= 0) await api.row.remove(workId)
    return workId
  }

)

export const terminate = (
  state: WorksState,
  workId: WorkId
) => {
  const currState = current(state)
  const work = currState.byId[workId]
  if (!work) throw new Error('Не получилось найти работу')

  if (work._meta_.status !== WorkStatus.Terminating) {
    state.byId[workId]._meta_.status = WorkStatus.Terminating
  }
  console.log('work._meta_.nextNode: ', work._meta_.nextNode)
  console.log('work._meta_.firstChildNode: ', work._meta_.firstChildNode)
  if (!work._meta_.nextNode && !work._meta_.firstChildNode) {
    if (work._meta_.prevNode !== null) {
      state.byId[work._meta_.prevNode]._meta_.nextNode === null
    }
    if (work._meta_.parentNode !== null) {
      state.byId[work._meta_.parentNode]._meta_.firstChildNode === null
    }

    delete state.byId[workId]
  }
}

