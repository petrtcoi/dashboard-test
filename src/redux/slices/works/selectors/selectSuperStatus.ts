import { RootState } from '../../../store'
import { getSuperStatus } from "../utils/getSuperStatus"
import { WorkId, WorkStatus } from "../../../../typescript/work.type"


export const selectSuperStatus = (workId: WorkId) => (state: RootState): WorkStatus | null => {

  return getSuperStatus(workId, state.works.metaById)

}


