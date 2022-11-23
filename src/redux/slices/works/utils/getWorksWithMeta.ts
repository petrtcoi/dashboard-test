import { SomeWorkLevel, WorkLevel, WorkWithMeta } from "../../../../components/DataTable/DataTable.types"
import { WorkGetDto } from "../../../../typescript/work.type"


/**
 *  Перобразует JSON работ в плоский массив, дополняя работы мета-данными
 *  Работы, которые выходят за допустимый уровень вложенности - игнорируются
 */
export const getWorksWithMetaFlatList = (works: WorkGetDto[]): WorkWithMeta[] => {
  return works
    .map(work => unpackWork(work, 1))
    .flat()
}



/**
 * Короткая рекурсия: проходит по детям (child) всех работ и по детям детей также
 * На последнего ребенка вешает флаг в _meta_ isLastChild: true
 */
function unpackWork(work: WorkGetDto, level: SomeWorkLevel, parentId: number | null = null): WorkWithMeta[] {
  if (!isCorrectLevel(level)) return []

  return [
    addMeta(work, level, parentId),
    ...work.child
      .map(workChild => unpackWork(workChild, getNextLevel(level), work.id))
      .flat()
      // отмечаем последние элементы в списке
      .map(setIsLastChildProp)

  ]
}

export function setIsLastChildProp(work: WorkWithMeta, index: number, workList: WorkWithMeta[]) {
  return (
    (
      (index + 1) === workList.length ||
      workList[index + 1]._meta_.level !== work._meta_.level
    )
      ?
      { ...work, _meta_: { ...work._meta_, isLastChild: true } }
      : { ...work, _meta_: { ...work._meta_, isLastChild: false } }
  )
}

/**
 * Добавляет _meta_, но без поля isLastChild
 * Это будет сделано в функции unpackWork
 */
function addMeta(work: WorkGetDto, level: WorkLevel, parentId: number | null): WorkWithMeta {
  return ({
    ...work,
    parentId,
    _meta_: {
      level,
      hasChild: work.child.length > 0
    }
  })
}


export function getNextLevel(level: SomeWorkLevel): SomeWorkLevel {
  return (
    (level == 1) ? 2 :
      (level === 2) ? 3 : -1
  )
}

function isCorrectLevel(level: SomeWorkLevel): level is WorkLevel {
  return (level === 1 || level === 2 || level === 3)
}