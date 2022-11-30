import * as R from "ramda"
import { WorkId } from "../../../../typescript/work.type"
import { RootState } from "../../../store"

const isNotNil = R.complement(R.isNil)

export const selectIsWorkExist = (workId: WorkId) =>
  (state: RootState) =>
    R.allPass([
      R.always(isNotNil(state.works.workById[workId])),
      R.always(isNotNil(state.works.metaById[workId]))
    ])
