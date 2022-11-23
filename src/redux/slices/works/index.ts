import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { getWorksWithMetaFlatList, setIsLastChildProp } from './utils/getWorksWithMeta'
import * as api from '../../../api'

import { WorkWithMeta } from '../../../components/DataTable/DataTable.types'
import { WorkCreateDto } from '../../../typescript/work.type'
import { getEmptyWork } from './utils/getEmptyWork'



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

    preCreate: (
      state,
      action: PayloadAction<{
        afterWorkId: WorkWithMeta['id'],
        parentId: WorkWithMeta['parentId'],
        level: WorkWithMeta['_meta_']['level']
      }>
    ) => {
      let work = getEmptyWork(action.payload.parentId, action.payload.level)
      const lastIndex = state.works.findIndex(w => w.id === action.payload.afterWorkId)
      if (lastIndex === -1) return
      state.works.splice(lastIndex + 1, 0, work)
      state.works = state.works.map(setIsLastChildProp)
    },
    update: (state) => {
      console.log(state)
    },
    remove: (state) => {
      console.log(state)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      state.works = action.payload
    }),
      builder.addCase(createWork.fulfilled, (state, action) => {
        const lastIndex = state.works.reverse().findIndex(w => w.parentId === action.payload.parentId)
        state.works = state.works.splice(lastIndex, 0, action.payload).reverse()
        state.works = getWorksWithMetaFlatList(state.works)
      })
  }
})

export const { preCreate, update, remove } = worksSlice.actions

export default worksSlice.reducer
