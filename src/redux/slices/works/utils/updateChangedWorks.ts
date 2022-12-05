import * as R from 'ramda'

import { WorkCreateDto, WorkChangedDto, castWorkDto } from '../../../../typescript/work.type'
import { WorksState } from '../index'
// Нет информации, как это выглядит. Предполагаем, что массив данных наподобие "current"


const _updateChangedWorks = (changed: WorkChangedDto[], state: WorksState): WorksState => {

  return R.reduce((acc, workDto) => {
    if (!acc.workById[workDto.id]) return acc
    return R.set(R.lensPath(['workById', workDto.id]), castWorkDto(workDto), acc)
  }, state, changed)
}

export const updateChangedWorks = R.curry(_updateChangedWorks)
