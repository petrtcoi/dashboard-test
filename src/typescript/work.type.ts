import Ajv, { JSONSchemaType } from 'ajv'
const ajv = new Ajv({ allErrors: true })

export type WorkId = number

type _Work = {
  id: WorkId,
  rowName: string,
  overheads: number,
  salary: number,
  materials: number,
  estimatedProfit: number,

  equipmentCosts: number,
  machineOperatorSalary: number,
  mainCosts: number,
  mimExploitation: number,
  supportCosts: number,
  total: number,
}

export type WorkParentId = WorkId | null

export type WorkLevel = 1 | 2 | 3
export type SomeWorkLevel = -1 | WorkLevel

export function isWorkLevelCorrect(level: SomeWorkLevel): level is WorkLevel {
  return (level === 1 || level === 2 || level === 3)
}
export function getNextLevel(level: SomeWorkLevel): SomeWorkLevel {
  return (
    (level == 1) ? 2 :
      (level === 2) ? 3 : -1
  )
}


export enum WorkStatus {
  Pending = 'pending',
  Creating = 'creating',
  Editing = 'editing',
  Blocked = 'blocked'
}
export type WorkMeta = {
  level: WorkLevel
  parentNode: WorkParentId
  prevNode: WorkId | null
  nextNode: WorkId | null
  childNodes: WorkId[]
  status: WorkStatus
}

export type Work = _Work & { _meta_: WorkMeta }
type WorkChild = { child: WorkGetDto[] }


/** ОБЩЕНИЕ С СЕРВЕРОМ */
export type WorkCreateDto = _Work & { parentId: WorkParentId }

export type WorkGetDto = _Work & WorkChild

export type WorkGetListDto = WorkGetDto[]



// @ts-ignore
const workGetSchema: JSONSchemaType<WorkGetDto> = {
  $id: 'work-get-schema',
  type: 'object',
  properties: {
    id: { type: 'integer' },
    rowName: { type: 'string' },

    equipmentCosts: { type: 'number' },
    estimatedProfit: { type: 'number' },
    machineOperatorSalary: { type: 'number' },
    mainCosts: { type: 'number' },
    materials: { type: 'number' },
    mimExploitation: { type: 'number' },
    overheads: { type: 'number' },
    salary: { type: 'number' },
    supportCosts: { type: 'number' },
    total: { type: 'number' },
    child: {
      type: 'array',
      minItems: 0,
      items: { $ref: 'work-get-schema' }
    }
  },
  required: [
    'id', 'rowName', 'equipmentCosts', 'estimatedProfit',
    'machineOperatorSalary', 'mainCosts', 'materials', 'mimExploitation',
    'overheads', 'salary', 'supportCosts', 'total', 'child'
  ],
}
export const validateGetList = ajv.addSchema(workGetSchema).compile(workGetSchema)