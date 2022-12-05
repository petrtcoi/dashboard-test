import * as R from 'ramda'

import { castWorkDto, Work, WorkChangedDto } from '../../../../typescript/work.type'
import { WorksState } from '../index'


export const addWorkToStateWorkById = R.curry(_addWorkToStateWorkById)

function _addWorkToStateWorkById(workDto: WorkChangedDto, state: WorksState): WorksState {

  const workId = workDto.id
  if (!workId) return state
 
  const work: Work = castWorkDto(workDto)
  return R.pipe(
    R.always(state),
    R.set(R.lensPath(['workById', workId]), work),
  )()

}