import { lensPath, compose } from "ramda"
import { WorkId } from "../typescript/work.type"




export const state_WorkMeta = (workId: WorkId) => lensPath(['metaById', workId])



export const state_Status = (workId: WorkId) =>
  compose(
    state_WorkMeta(workId),
    lensPath(['status'])
  )
export const state_StatusAction = (workId: WorkId) =>
  compose(
    state_Status(workId),
    lensPath(['action'])
  )



export const state_SuperStatus = (workId: WorkId) =>
  compose(
    state_WorkMeta(workId),
    lensPath(['superStatus'])
  )
export const state_SupertatusAction = (workId: WorkId) =>
  compose(
    state_SuperStatus(workId),
    lensPath(['action'])
  )



export const state_NextNode = (workId: WorkId) =>
  compose(
    state_WorkMeta(workId),
    lensPath(['nextNode'])
  )

export const state_PrevNode = (workId: WorkId) =>
  compose(
    state_WorkMeta(workId),
    lensPath(['prevNode'])
  )

export const state_FirstChildNode = (workId: WorkId) =>
  compose(
    state_WorkMeta(workId),
    lensPath(['firstChildNode'])
  )

export const state_ParentNode = (workId: WorkId) =>
  compose(
    state_WorkMeta(workId),
    lensPath(['parentNode'])
  )
