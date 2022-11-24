import { WorksState } from ".."
import { WorkGetDto, Work, WorkParentId, WorkLevel, WorkStatus, getNextLevel, isWorkLevelCorrect } from "../../../../typescript/work.type"


/**
 *  Перобразует JSON работ в плоский массив, дополняя работы мета-данными
 *  Работы, которые выходят за допустимый уровень вложенности - игнорируются
 */
export const handleListFromDb = (works: WorkGetDto[]): Pick<WorksState, 'byId'> => {

  return {
    byId: works
      .map(getUnpackWorkListWithLevel(1, null))
      .flat()
      .reduce((acc, work) => Object.assign(acc, { [work.id]: work }), Object.create(null))
  }

}

type Props = {
  workDto: WorkGetDto,
  parentId: WorkParentId,
  level: WorkLevel,
  prevNode: Work['_meta_']['prevNode'],
  nextNode: Work['_meta_']['nextNode']
}

function getWorkIds(work: WorkGetDto): number[] {
  return [work.id, ...work.child.map(getWorkIds)].flat()
}


function unpackWork(props: Props): Work[] {
  const work = getWork(props)
  const nextLevel = getNextLevel(props.level)
  if (!isWorkLevelCorrect(nextLevel)) return [work]
  const unpackWorkListLevel = getUnpackWorkListWithLevel(nextLevel, work.id)

  return [work, ...props.workDto.child.map(unpackWorkListLevel)].flat()
}


function getUnpackWorkListWithLevel(level: WorkLevel, parentNode: WorkParentId) {
  return function unpachWorkList(work: WorkGetDto, index: number, childWorkList: WorkGetDto[]) {
    return unpackWork({
      workDto: work,
      level: level,
      parentId: parentNode,
      prevNode: childWorkList[index - 1]?.id || null,
      nextNode: childWorkList[index + 1]?.id || null
    })
  }
}


function getWork(props: Props): Work {
  const { child, ...workData } = props.workDto
  return {
    ...workData,
    _meta_: {
      level: props.level,
      parentNode: props.parentId,
      prevNode: props.prevNode,
      nextNode: props.nextNode,
      status: WorkStatus.Pending,
      childNodes: props.workDto.child.map(x => x.id)
    }
  }
}

