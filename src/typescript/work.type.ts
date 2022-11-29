import Joi from 'joi'
import * as R from 'ramda'
import { removeWork } from '../redux/slices/works/functions/terminate'


export type WorkId = number
export enum VisibilityStatus {
  Expanded = 'expanded',      // развернуты подзадачи
  Collapsed = 'collapsed'     // подзадачи свернуты
}
export enum ActionStatus {
  Idle = 'idle',      // ничего не происходит
  Editing = 'editing',      // задачу редактируют
  Creating = 'creating'    // задача создается
}
export type WorkStatus = {
  visibility: VisibilityStatus
  action: ActionStatus
  drawFoldersTreeLines: { 1: boolean, 2: boolean }
}




export type Work = {
  id: WorkId,
  rowName: string,
  overheads: number,
  salary: number,
  materials: number,
  estimatedProfit: number
}
/** Убирает лишние поля из WorkGetDto, чтобы получить Work */
export const castWorkDto = (obj: WorkGetDto): Work => R.pick(['id', 'rowName', 'overheads', 'salary', 'materials', 'estimatedProfit'], obj)


export type WorkMeta = {
  nextNode?: WorkId
  prevNode?: WorkId
  parentNode?: WorkId
  firstChildNode?: WorkId

  nestingLevel: number          // уровень вложенности Work в дереве
  status: WorkStatus            // собственный статус Work
  soakingStatus: WorkStatus     // агрегированный статус, "опускающийся" от siblings (prevNode) и parent
}




/**
 * Чать Work, которая в рамках данного проекта
 * никак не используется
 */
export type NotUsedInfo = {
  equipmentCosts: number,
  machineOperatorSalary: number,
  mainCosts: number,
  mimExploitation: number,
  supportCosts: number,
  total: number,
}
export function genEmptyNotUserInfo(): NotUsedInfo {
  return {
    equipmentCosts: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    mimExploitation: 0,
    supportCosts: 0,
    total: 0,
  }
}


/**
 * Обмен информацией с сервером
 */

export type CreateWorkDto =
  Omit<Work, 'id'>
  & NotUsedInfo
  & { parentId?: WorkId }

export type WorkGetDto =
  Work
  & NotUsedInfo
  & { child: WorkGetDto[] }

export type WorkGetListDto = WorkGetDto[]



/**
 * Joi схема для валидации ответа с сервера - getList
 */
export const workDtoSchema = Joi.object({
  id: Joi.number().required(),
  rowName: Joi.string().required(),
  equipmentCosts: Joi.number().required(),
  estimatedProfit: Joi.number().required(),
  machineOperatorSalary: Joi.number().required(),
  mainCosts: Joi.number().required(),
  materials: Joi.number().required(),
  mimExploitation: Joi.number().required(),
  overheads: Joi.number().required(),
  salary: Joi.number().required(),
  supportCosts: Joi.number().required(),
  total: Joi.number().required(),
  child: Joi.array().items(Joi.link('#work_dto'))
}).id('work_dto')
