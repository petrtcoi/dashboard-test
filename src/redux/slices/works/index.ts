import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import * as R from 'ramda'

import { Work, WorkId, WorkMeta } from "../../../typescript/work.type"
import { fetchAllWorks } from "./asyncThunks/ferchAllWorks"

export * from './asyncThunks/'


const defError = R.defaultTo('Произошла ошибка')


export type WorksState = {
  rootWorkId?: WorkId
  workById: { [workId: WorkId]: Work }
  metaById: { [workId: WorkId]: WorkMeta }
  pending: boolean  // ждет ответ с сервера
  message: string   // сообщение для пользователи
  error: string    // сообщение об ошибке
}
const initialState: WorksState = {
  rootWorkId: undefined,
  workById: {},
  metaById: {},
  pending: false,
  message: '',
  error: ''
}



export const worksSlice = createSlice({
  name: 'works',
  initialState,

  reducers: {},

  extraReducers: (builder) => {

    /** FETCH ALL USERS */
    builder.addCase(fetchAllWorks.pending, (state, action) => {
      state = { ...state, pending: true, message: '', error: '' }
      return state
    })
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      state = { ...state, ...action.payload, pending: false, message: 'Данные загружены' }
      return state
    })
    builder.addCase(fetchAllWorks.rejected, (state, action) => {
      state = { ...state, pending: false, error: defError(action.error.message) }
      return state
    })
  }

})

export default worksSlice.reducer
