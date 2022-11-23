import { WorkId, WorkMeta, WorkWithMeta } from "../../../../components/DataTable/DataTable.types"

export function getEmptyWork(parentId: WorkWithMeta['parentId'], level: WorkMeta['level']): WorkWithMeta {

  return ({
    id: Math.floor(Math.random() * -100),
    parentId: parentId,
    rowName: 'Название работы',
    materials: 0,
    overheads: 0,
    salary: 0,
    estimatedProfit: 0,
    machineOperatorSalary: 0,
    equipmentCosts: 0,
    mainCosts: 0,
    mimExploitation: 0,
    supportCosts: 0,
    total: 0,
    child: [],
    _meta_: {
      level,
      hasChild: false,
      isLastChild: level === 1 ? false : true
    }
  })
}

