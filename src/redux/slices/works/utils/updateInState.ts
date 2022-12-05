import * as R from 'ramda'
import { current } from "@reduxjs/toolkit"
import { WorksState } from ".."
import { WritableDraft } from "immer/dist/internal"

import { ActionStatus, Work } from "../../../../typescript/work.type"

export const updateInState
 = (
  state: WritableDraft<WorksState>,
  currentWork: Work
) => {
  const currState = current(state)
  const work: Work = R.pick(['id', 'rowName', 'overheads', 'salary', 'materials', 'estimatedProfit'], currentWork)

  let newState = R.assocPath(['workById', work.id], work, currState)
  
  const statusLens = R.lensPath(['metaById', work.id, 'status', 'action'])
  newState = R.set(statusLens, ActionStatus.Idle, newState)

  return  newState
}

