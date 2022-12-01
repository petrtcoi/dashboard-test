import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { fetchAllWorks, updateWork, deleteWork } from "./asyncThunks/"

import * as R from 'ramda'

import {
  addDeleteWork, addFetchAllWorks, addUpdateWork, clearDeleteWork, clearFetchAllWorks, clearUpdateWork,
  deleteFromState, insertToState, switchOffWorks, updateInState
} from "./utils"


import { ActionStatus, Work, WorkId, WorkMeta, WorkStatus } from '../../../typescript/work.type'
import { ErrorLog, logError } from "../../../typescript/errorLog.type"





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

    /** 
     * Устанавливает значение META -> Status 
     */
    setStatus: (state, action: PayloadAction<{ workId: WorkId, status: WorkStatus }>) => {
      const { workId, status } = action.payload
      state.metaById[workId].status = status
    },

    /** 
     * Устанавливает значение META -> SuperStatus 
     */
    setSuperStatus: (state, action: PayloadAction<{ workId: WorkId, status: WorkStatus }>) => {
      const { workId, status } = action.payload
      return R.set(R.lensPath(['metaById', workId, 'superStatus']), status, current(state))
    },


    /**
     * Меняет статус Work
     * Если это статус, не равный Idle, то все остальные Work переводятся в Idle.
     * Также удаляем все Work, находящиеся в процессе создания
     */
    setActionStatus: (state, action: PayloadAction<{ workId: WorkId, status: ActionStatus }>) => {
      const { workId, status } = action.payload
      const workActionLens = R.lensPath(['metaById', workId, 'status', 'action'])
      return R.pipe(
        R.ifElse(
          () => status === ActionStatus.Idle,
          () => state,
          () => switchOffWorks(state)
        ),
        R.set(workActionLens, status)
      )()
    },

    /**
     * Создает "временную" Work, которая потом будет сохранена в базу.
     * Id работы берется как Date.now() со знаком минус
     */
    preCreateWork: (state, action: PayloadAction<{ prevNode?: WorkId, parentNode?: WorkId }>) => {
      const currState: WorksState = R.clone(current(state))
      return R.pipe(
        () => switchOffWorks(state),
        (state) => insertToState({ state, ...action.payload })
      )()
    }

  },

  extraReducers: (builder) => {

    /**
     * Добавление новой Work
    */
    builder.addCase(fetchAllWorks.pending, (state, action) => {
      return { ...state, onWork: addFetchAllWorks(state.onWork) }
    })
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      return { ...state, ...action.payload, onWork: clearFetchAllWorks(state.onWork) }
    })
    builder.addCase(fetchAllWorks.rejected, (state, action) => {
      return { ...state, onWork: clearFetchAllWorks(state.onWork), errorLogs: [...state.errorLogs, logError(null, 'fetchAllWorks', action.error.message)] }
    })


    /**
    * Удаление  Work
    */
    builder.addCase(deleteWork.pending, (state, action) => {
      return { ...state, onWork: addDeleteWork(state.onWork) }
    })
    builder.addCase(deleteWork.fulfilled, (state, action) => {
      return { ...deleteFromState(state, action.payload.workId), onWork: clearDeleteWork(state.onWork) }
    })
    builder.addCase(deleteWork.rejected, (state, action) => {
      return { ...state, onWork: clearDeleteWork(state.onWork), errorLogs: [...state.errorLogs, logError(null, 'fetchAllWorks', action.error.message)] }
    })


    /**
    * Update  Work
    */
    builder.addCase(updateWork.pending, (state, action) => {
      return { ...state, onWork: addUpdateWork(state.onWork) }
    })
    builder.addCase(updateWork.fulfilled, (state, action) => {
      return { ...updateInState(state, action.payload.current), onWork: clearUpdateWork(state.onWork) }
    })
    builder.addCase(updateWork.rejected, (state, action) => {
      return { ...state, onWork: clearUpdateWork(state.onWork), errorLogs: [...state.errorLogs, logError(null, 'fetchAllWorks', action.error.message)] }
    })
  }

})

export const { setStatus, setSuperStatus, setActionStatus, preCreateWork } = worksSlice.actions
export default worksSlice.reducer
