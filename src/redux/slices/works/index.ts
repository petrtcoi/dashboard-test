import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Work, WorkId, WorkMeta } from "../../../typescript/work.type"
import { fetchAllWorks } from "./asyncThunks/ferchAllWorks"

export * from './asyncThunks/'


export type WorksState = {
  rootWorkId?: WorkId
  worksById: { [workId: WorkId]: Work }
  metaById: { [workId: WorkId]: WorkMeta }
}
const initialState: WorksState = {
  rootWorkId: undefined,
  worksById: {},
  metaById: {},
}



export const worksSlice = createSlice({
  name: 'works',
  initialState,
  
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchAllWorks.fulfilled, (state, action) => {
      console.log(action.payload)
      state = { ...state, ...action.payload }
    })
  }

})

export default worksSlice.reducer
