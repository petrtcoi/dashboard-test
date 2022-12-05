import * as R from 'ramda'

import { Work, WorkChangedDto } from '../../../../typescript/work.type'
import { WorksState } from '../index'


export const addWorkToStateWorkById = R.curry(_addWorkToStateWorkById)

function _addWorkToStateWorkById(workDto: WorkChangedDto, state: WorksState): WorksState {
  
  const workId = workDto.id
  if (!workId) return state
 
  const work: Work = R.pick(['id', 'rowName', 'overheads', 'salary', 'materials', 'estimatedProfit'], workDto)
  return R.pipe(
    R.always(state),
    R.set(R.lensPath(['workById', workId]), work),
  )()

}