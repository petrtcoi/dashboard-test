import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiCreateResponse, Work, WorkId } from "../../../../typescript/work.type"

import * as api from './../../../../api/'



type CreateWorkProps = { workId: WorkId, parentId: WorkId | undefined, data: Work }

export const createWork = createAsyncThunk<ApiCreateResponse, CreateWorkProps>(
  'works/create',
  async (props: CreateWorkProps) => {
    return await api.works.create(props)
  }
)


