import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiUpdateResponse, WorkId } from "../../../../typescript/work.type"

import * as api from './../../../../api/'



type DeleteWOrkProps = { workId: WorkId }

export const deleteWork = createAsyncThunk<DeleteWOrkProps, DeleteWOrkProps>(
  'works/delete',
  // @ts-ignore
  async (props: DeleteWOrkProps) => {
    await api.works.deleteWork(props)
    return props
  }
)


