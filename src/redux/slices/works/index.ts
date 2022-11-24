import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { WorkCreateDto, Work, } from '../../../typescript/work.type'

import { removeWorkWithChild, fetchAllWorks, preCreate as preCreateMethod } from './methods'
import { removeWork } from './methods/remove'

import * as api from '../../../api'
export * from './methods'



export type WorksState = {
  byId: { [keyId: string]: Work }
  fetched: boolean
}
const initialState: WorksState = {
  byId: {},
  fetched: false
}



export const createWork = createAsyncThunk(
  'works/create',
  async (work: WorkCreateDto) => {
    return await api.row.create(work)
  }
)





export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    setFetchedStatus: (state, action: PayloadAction<boolean>) => {
      state.fetched = action.payload
    },
    preCreate: preCreateMethod,
    update: (state) => {
      console.log(state)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      state = {...state, ...action.payload}
    })
    builder.addCase(removeWork.fulfilled, (state, action) => {
      removeWorkWithChild(state, action.payload)
    })
    // ,
    //   builder.addCase(createWork.fulfilled, (state, action) => {
    //     const lastIndex = state.works.reverse().findIndex(w => w.parentId === action.payload.parentId)
    //     state.works = state.works.splice(lastIndex, 0, action.payload).reverse()
    //     state.works = getWorksWithMetaFlatList(state.works)
    //   })
  }
})

export const { preCreate, update, setFetchedStatus } = worksSlice.actions

export default worksSlice.reducer
