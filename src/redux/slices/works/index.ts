import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getWorksWithMetaFlatList } from './utils/getWorksWithMeta'
import * as api from '../../../api'

import { WorkWithMeta } from '../../../components/DataTable/DataTable.types'



export type WorksState = {
  works: WorkWithMeta[]
}
const initialState: WorksState = {
  works: []
}


export const fetchAllWorks = createAsyncThunk(
  'works/fetchAll',
  async () => {
    const dbData = await api.row.getList()
    const works = getWorksWithMetaFlatList(dbData)
    return works
  }

)





export const worksSlice = createSlice({
  name: 'works',
  initialState,
  reducers: {
    create: (state) => {
      console.log(state)
    },
    update: (state) => {
      console.log(state)
    },
    remove: (state) => {
      console.log(state)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      state.works = action.payload
    })
  }
})

export const { create, update, remove } = worksSlice.actions

export default worksSlice.reducer
