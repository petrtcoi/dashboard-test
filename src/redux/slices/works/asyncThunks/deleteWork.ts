import { createAsyncThunk } from "@reduxjs/toolkit"
import { WorkId, ApiDeleteResponse } from '../../../../typescript/work.type'

import * as api from './../../../../api/'



type DeleteWorkProps = { workId: WorkId }

export const deleteWork = createAsyncThunk<ApiDeleteResponse, DeleteWorkProps>(
  'works/delete',
  async (props: DeleteWorkProps) => {
    const res = await api.works.deleteWork(props)
    return { ...res, deletedWorkId: props.workId }
  }
)


