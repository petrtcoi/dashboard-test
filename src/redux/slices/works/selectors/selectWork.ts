import { WorkId } from '../../../../typescript/work.type'
import { RootState } from '../../../store'


export const selectWork = (workId: WorkId) => (state: RootState) => state.works.workById[workId]