import { Work, WorkId, WorkLevel, WorkParentId, WorkStatus } from "../../../../typescript/work.type"

export function getEmptyWork(props: {
  parentId: WorkParentId,
  level: WorkLevel,
  prevNode: WorkId | null,
  nextNode: WorkId | null
}): Work {

  return ({
    id: -Date.now(),
    rowName: 'Новая работа',
    overheads: 0,
    salary: 0,
    materials: 0,
    estimatedProfit: 0,

    equipmentCosts: 0,
    machineOperatorSalary: 0,
    mainCosts: 0,
    mimExploitation: 0,
    supportCosts: 0,
    total: 0,

    _meta_: {
      parentNode: props.parentId,
      level: props.level,
      prevNode: props.prevNode,
      nextNode: props.nextNode,
      childNodes: [],
      status: WorkStatus.Creating
    }
  })
}

