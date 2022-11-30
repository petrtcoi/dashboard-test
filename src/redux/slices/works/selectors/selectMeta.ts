import { WorkId } from '../../../../typescript/work.type'
import { RootState } from '../../../store'


export const selectMeta =(workId: WorkId) => (state: RootState) => state.works.metaById[workId]