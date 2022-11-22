import Ajv, { JSONSchemaType } from 'ajv'
const ajv = new Ajv({ allErrors: true })

type Work = {
  id: number,
  parentId: number,
  rowName: string,

  equipmentCosts: number,
  estimatedProfit: number,
  machineOperatorSalary: number,
  mainCosts: number,
  materials: number,
  mimExploitation: number,
  overheads: number,
  salary: number,
  supportCosts: number,
}

export type WorkCreateDto = Work
export type WorkGetDto = Work & {
  total: number
  child: WorkGetDto[]
}
export type WorkGetListDto = WorkGetDto[]




// @ts-ignore
const workGetSchema: JSONSchemaType<WorkGetDto> = {
  $id: 'work-get-schema',
  type: 'object',
  properties: {
    id: { type: 'integer' },
    parentId: { type: 'integer' },
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