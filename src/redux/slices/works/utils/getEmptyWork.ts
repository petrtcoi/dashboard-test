import { Work, WorkId, WorkLevel, WorkParentId, WorkStatus } from "../../../../typescript/work.type"

export type GetEmptyWorkProps = {
  parentNode: WorkParentId,
  level: WorkLevel,
  prevNode: WorkId | null,
  nextNode: WorkId | null
}

export function getEmptyWork(props: GetEmptyWorkProps): Work {
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
      parentNode: props.parentNode,
      level: props.level,
      prevNode: props.prevNode,
      nextNode: props.nextNode,
      childNodes: [],
      status: WorkStatus.Creating
    }
  })
}

