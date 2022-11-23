import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import * as api from '../../../api'

import { WorkCreateDto, Work, WorkId, WorkParentId, WorkLevel } from '../../../typescript/work.type'

import { fetchAllWorks, preCreate as preCreateMethod } from './methods'
import { getEmptyWork } from './utils/getEmptyWork'

export * from './methods'


export type WorksState = {
  byId: { [keyId: string]: Work }
  ids: number[]
}
const initialState: WorksState = {
  byId: {},
  ids: []
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

    preCreate: preCreateMethod,
    update: (state) => {
      console.log(state)
    },
    remove: (state) => {
      console.log(state)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      return action.payload
    })
    // ,
    //   builder.addCase(createWork.fulfilled, (state, action) => {
    //     const lastIndex = state.works.reverse().findIndex(w => w.parentId === action.payload.parentId)
    //     state.works = state.works.splice(lastIndex, 0, action.payload).reverse()
    //     state.works = getWorksWithMetaFlatList(state.works)
    //   })
  }
})

export const { preCreate, update, remove } = worksSlice.actions

export default worksSlice.reducer
