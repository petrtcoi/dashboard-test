import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as R from 'ramda'

import { fetchAllWorks } from "./asyncThunks/ferchAllWorks"
import { addFetchAllWorks, clearFetchAllWorks } from "./utils/onWork"

import { Work, WorkId, WorkMeta, WorkStatus } from "../../../typescript/work.type"
import { ErrorLog, logError } from "../../../typescript/errorLog.type"
import { selectSuperStatus } from './selectors/selectSuperStatus'



export * from './asyncThunks/'



export type WorksState = {
  rootWorkId?: WorkId
  workById: { [workId: WorkId]: Work }
  metaById: { [workId: WorkId]: WorkMeta }
  onWork: { [key: string]: true }  // ждет ответ с сервера
  errorLogs: ErrorLog[]    // сообщениz об ошибке
}
const initialState: WorksState = {
  rootWorkId: undefined,
  workById: {},
  metaById: {},
  onWork: {},
  errorLogs: []
}



export const worksSlice = createSlice({
  name: 'works',
  initialState,

  reducers: {
    setSuperStatus: (state, action: PayloadAction<{ workId: WorkId, status: WorkStatus }>) => {
      const { workId, status } = action.payload
      state.metaById[workId].superStatus = status
    }

  },

  extraReducers: (builder) => {

    /** FETCH ALL USERS */
    builder.addCase(fetchAllWorks.pending, (state, action) => {
      state = { ...state, onWork: addFetchAllWorks(state.onWork) }
      return state
    })
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      state = { ...state, ...action.payload, onWork: clearFetchAllWorks(state.onWork) }
      return state
    })
    builder.addCase(fetchAllWorks.rejected, (state, action) => {
      state = { ...state, onWork: clearFetchAllWorks(state.onWork), errorLogs: [...state.errorLogs, logError(null, 'fetchAllWorks', action.error.message)] }
      return state
    })
  }

})

export const { setSuperStatus } = worksSlice.actions
export default worksSlice.reducer
