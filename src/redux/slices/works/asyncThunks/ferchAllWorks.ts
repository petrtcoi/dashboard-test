import { createAsyncThunk } from "@reduxjs/toolkit"
import { works } from './../../../../api/index'

import { WorksState } from ".."

export type FetchAllWorksResult = Pick<WorksState, 'metaById' | 'rootWorkId' | 'worksById'>

export const fetchAllWorks = createAsyncThunk<Promise<FetchAllWorksResult>>(
  'works/fetchAll',
  async () => {
    const apiData = await works.getList()
    console.log(apiData)

    return ({
      worksById: {},
      metaById: {}
    })

  }
) 
