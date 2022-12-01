import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiUpdateResponse, Work, WorkId } from "../../../../typescript/work.type"

import * as api from './../../../../api/'



type UpdateWorkProps = { workId: WorkId, data: Work }

export const updateWork = createAsyncThunk<ApiUpdateResponse,UpdateWorkProps>(
  'works/update',
  async (props: UpdateWorkProps) => {
    return await api.works.update(props)
  }
)


