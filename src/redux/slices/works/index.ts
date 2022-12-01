import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import * as R from 'ramda'

import { fetchAllWorks, updateWork, deleteWork } from "./asyncThunks/"
import { addFetchAllWorks, clearFetchAllWorks, clearUpdateWork, addDeleteWork, clearDeleteWork, addUpdateWork } from './utils/onWork'
import { updateInState, deleteFromState } from "./functions/"

import { ActionStatus, Work, WorkId, WorkMeta, WorkStatus } from '../../../typescript/work.type'
import { ErrorLog, logError } from "../../../typescript/errorLog.type"
import { insertToState } from './functions/insertToState'
import { WritableDraft } from "immer/dist/internal"




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
    setStatus: (state, action: PayloadAction<{ workId: WorkId, status: WorkStatus }>) => {
      const { workId, status } = action.payload
      state.metaById[workId].status = status
    },
    setSuperStatus: (state, action: PayloadAction<{ workId: WorkId, status: WorkStatus }>) => {
      const { workId, status } = action.payload
      return R.set(R.lensPath(['metaById', workId, 'superStatus']), status, current(state))
    },
    setActionStatus: (state, action: PayloadAction<{ workId: WorkId, status: ActionStatus }>) => {
      const { workId, status } = action.payload
      if (status !== ActionStatus.Idle) {
        Object.keys(state.workById).forEach((id) => {
          state.metaById[id as unknown as WorkId].status.action = ActionStatus.Idle
        })
      }
      state.metaById[workId].status.action = status
    },
    preCreateWork: (state, action: PayloadAction<{ prevNode?: WorkId, parentNode?: WorkId }>) => {
      return insertToState({ state, ...action.payload })
    }

  },

  extraReducers: (builder) => {

    /** FETCH ALL USERS */
    builder.addCase(fetchAllWorks.pending, (state, action) => {
      return {
        ...state,
        onWork: addFetchAllWorks(state.onWork)
      }
      return state
    })

    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      return {
        ...state,
        ...action.payload,
        onWork: clearFetchAllWorks(state.onWork)
      }
    })

    builder.addCase(fetchAllWorks.rejected, (state, action) => {
      return {
        ...state,
        onWork: clearFetchAllWorks(state.onWork),
        errorLogs: [...state.errorLogs, logError(null, 'fetchAllWorks', action.error.message)]
      }
    })


    /** DELETE USER */
    builder.addCase(deleteWork.pending, (state, action) => {
      return {
        ...state,
        onWork: addDeleteWork(state.onWork)
      }
    })

    builder.addCase(deleteWork.fulfilled, (state, action) => {
      return {
        ...deleteFromState(state, action.payload.workId),
        onWork: clearDeleteWork(state.onWork)
      }
    })
    builder.addCase(deleteWork.rejected, (state, action) => {
      return {
        ...state,
        onWork: clearDeleteWork(state.onWork),
        errorLogs: [...state.errorLogs, logError(null, 'fetchAllWorks', action.error.message)]
      }
    })


    /** UPDATE USER */
    builder.addCase(updateWork.pending, (state, action) => {
      state = { ...state, onWork: addUpdateWork(state.onWork) }
      return state
    })
    builder.addCase(updateWork.fulfilled, (state, action) => {
      return { ...updateInState(state, action.payload.current), onWork: clearUpdateWork(state.onWork) }
    })
    builder.addCase(updateWork.rejected, (state, action) => {
      state = { ...state, onWork: clearUpdateWork(state.onWork), errorLogs: [...state.errorLogs, logError(null, 'fetchAllWorks', action.error.message)] }
      return state
    })
  }

})

export const { setStatus, setSuperStatus, setActionStatus, preCreateWork } = worksSlice.actions
export default worksSlice.reducer
