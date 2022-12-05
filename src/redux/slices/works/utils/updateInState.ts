import * as R from 'ramda'
import { current } from "@reduxjs/toolkit"
import { WorksState } from ".."
import { WritableDraft } from "immer/dist/internal"

import { ActionStatus, castWorkDto, Work } from "../../../../typescript/work.type"

export const updateInState
 = (
  state: WritableDraft<WorksState>,
  currentWork: Work
) => {
  const work: Work = castWorkDto(currentWork)

  let newState = R.assocPath(['workById', work.id], work, state)
  
  const statusLens = R.lensPath(['metaById', work.id, 'status', 'action'])
  newState = R.set(statusLens, ActionStatus.Idle, newState)

  return  newState
}

