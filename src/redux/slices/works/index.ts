import { createSlice, current, PayloadAction } from "@reduxjs/toolkit"
import { fetchAllWorks, updateWork, deleteWork, createWork } from "./asyncThunks/"

import * as R from 'ramda'

import {
  onWork, addUpdateWork, clearUpdateWork,
  deleteFromState, preCreateWorkInState, switchOffWorks, updateInState, updateSuperStatusDownfall
} from "./utils"


import { ActionStatus, Work, WorkId, WorkMeta, WorkStatus } from '../../../typescript/work.type'
import { ErrorLog, logError } from "../../../typescript/errorLog.type"
import { replaceWorkIdInState } from "./utils/replaceWorkIdInState"
import { addWorkToStateWorkById } from "./utils/addWorkToStateWorkById"




export * from './asyncThunks/'



export type WorksState = {
  rootWorkId?: WorkId
  workById: { [workId: WorkId]: Work }
  metaById: { [workId: WorkId]: WorkMeta }
  onWork: { [key: string]: true | undefined }  // ждет ответ с сервера
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
      const _state: WorksState = current(state)
      return R.set(R.lensPath(['metaById', workId, 'superStatus']), status, _state)
    },


    /**
     * Меняет статус Work
     * Если это статус, не равный Idle, то все остальные Work переводятся в Idle.
     * Также удаляем все Work, находящиеся в процессе создания
     */
    setActionStatus: (state, action: PayloadAction<{ workId: WorkId, actionStatus: ActionStatus }>) => {
      const { workId, actionStatus } = action.payload
      const _state: WorksState = current(state)
      return R.pipe(
        R.ifElse(
          () => actionStatus === ActionStatus.Idle,
          () => _state,
          () => switchOffWorks(_state)
        ),
        R.set(R.lensPath(['metaById', workId, 'status', 'action']), actionStatus),
      )()
    },


    /** 
   * Отменяем созданеи задачи. Для этого ее просто вычеркиваем из Meta 
   */
    cancelCreatingTask: (state, action: PayloadAction<{ workId: WorkId }>) => {
      const { workId } = action.payload
      return deleteFromState(workId, state)
    },





    /**
     * Создает "временную" Work, которая потом будет сохранена в базу.
     * Id работы берется как Date.now() со знаком минус
     */
    preCreateWork: (state, action: PayloadAction<{ prevNode?: WorkId, parentNode?: WorkId }>) => {
      return R.pipe(
        () => switchOffWorks(state),
        (state) => preCreateWorkInState({ state, ...action.payload })
      )()
    }

  },

  extraReducers: (builder) => {

    /**
     * Добавление новой Work
    */
    builder.addCase(fetchAllWorks.pending, (state: WorksState, _action) => {
      const _state: WorksState = current(state)
      return R.pipe(
        R.always(_state),
        R.set(R.lensPath(['onWork', onWork.fetchAllWorks()]), true),
      )()
    })

    builder.addCase(fetchAllWorks.fulfilled, (state: WorksState, action) => {
      const _state: WorksState = current(state)
      return R.pipe(
        R.always(_state),
        R.mergeLeft(action.payload),
        R.set(R.lensPath(['onWork', onWork.fetchAllWorks()]), undefined),
        (data: any) => updateSuperStatusDownfall(data.rootWorkId, data),
      )()
    })

    builder.addCase(fetchAllWorks.rejected, (state: WorksState, action) => {
      const errorLog = logError(null, 'fetchAllWorks', action.error.message)
      const _state: WorksState = current(state)
      return R.pipe(
        R.always(_state),
        R.set(R.lensPath(['onWork', onWork.fetchAllWorks()]), undefined),
        R.set(R.lensPath(['errorLogs']), R.append(errorLog, _state.errorLogs)),
      )()
    })


    /**
    * Удаление  Work
    */
    builder.addCase(deleteWork.pending, (state: WorksState, action) => {
      const _state: WorksState = current(state)

      return R.pipe(
        R.always(_state),
        R.set(R.lensPath(['onWork', onWork.deleteWork(action.meta.arg.workId)]), true),
      )()
    })

    builder.addCase(deleteWork.fulfilled, (state: WorksState, action) => {
      const _state: WorksState = current(state)
      return R.pipe(
        R.always(_state),
        () => deleteFromState(action.payload.workId, _state),
        R.set(R.lensPath(['onWork', onWork.deleteWork(action.meta.arg.workId)]), undefined),
      )()
    })

    builder.addCase(deleteWork.rejected, (state: WorksState, action) => {
      const errorLog = logError(action.meta.arg.workId, 'deleteWork', action.error.message)
      const _state: WorksState = current(state)
      return R.pipe(
        R.always(_state),
        R.set(R.lensPath(['onWork', onWork.deleteWork(action.meta.arg.workId)]), undefined),
        R.set(R.lensPath(['errorLogs']), R.append(errorLog, _state.errorLogs)),
      )()
    })


    /**
    * Update  Work
    */
    builder.addCase(updateWork.pending, (state: WorksState, action) => {
      return { ...state, onWork: addUpdateWork(state.onWork) }
    })
    builder.addCase(updateWork.fulfilled, (state: WorksState, action) => {
      return { ...updateInState(state, action.payload.current), onWork: clearUpdateWork(state.onWork) }
    })
    builder.addCase(updateWork.rejected, (state: WorksState, action) => {
      return { ...state, onWork: clearUpdateWork(state.onWork), errorLogs: [...state.errorLogs, logError(null, 'fetchAllWorks', action.error.message)] }
    })

    /**
    * Создание  Work
    */

    builder.addCase(createWork.pending, (state: WorksState, action) => {
      const _state: WorksState = current(state)
      return R.pipe(
        R.always(_state),
        R.set(R.lensPath(['onWork', onWork.addWork(action.meta.arg.workId)]), true),
      )()
    })


    builder.addCase(createWork.fulfilled, (state: WorksState, action) => {
      const _state: WorksState = current(state)
      const addToStateWorkById = addWorkToStateWorkById(action.payload.current)
      const replaceIdsForNewWork = replaceWorkIdInState(action.payload.current.id, action.payload.preCreateWorkId)
    
      return R.pipe(
        R.always(_state),
        addToStateWorkById,
        replaceIdsForNewWork,
        R.set(R.lensPath(['metaById', action.payload.current.id, 'status', 'action']), ActionStatus.Idle),
        R.set(R.lensPath(['onWork', onWork.addWork(action.meta.arg.workId)]), undefined),
      )()
    })

    builder.addCase(createWork.rejected, (state: WorksState, action) => {
      const errorLog = logError(action.meta.arg.data.id, 'createWork', action.error.message)
      const _state: WorksState = current(state)
      
      return R.pipe(
        R.always(_state),
        R.set(R.lensPath(['onWork', onWork.addWork(action.meta.arg.workId)]), undefined),
        R.set(R.lensPath(['errorLogs']), R.append(errorLog, _state.errorLogs)),
      )()
    })
  }

})


export const { setStatus, setSuperStatus, setActionStatus, preCreateWork, cancelCreatingTask } = worksSlice.actions
export default worksSlice.reducer
