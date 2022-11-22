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
function unpackWork(work: WorkGetDto, level: SomeWorkLevel): WorkWithMeta[] {
  if (!isCorrectLevel(level)) return []

  return [
    addMeta(work, level),
    ...work.child
      .map(workChild => unpackWork(workChild, getNextLevel(level)))
      .flat()
      // отмечаем последние элементы в списке
      .map((work, index, workList) => {
        return (
          (
            (index + 1) === workList.length ||
            work._meta_.level === workList[index - 1]?._meta_?.level
          )
            ?
            { ...work, _meta_: { ...work._meta_, isLastChild: true } }
            : work
        )
      })

  ]
}

/**
 * Добавляет _meta_, но без поля isLastChild
 * Это будет сделано в функции unpackWork
 */
function addMeta(work: WorkGetDto, level: WorkLevel): WorkWithMeta {
  return ({
    ...work,
    _meta_: {
      level,
      hasChild: work.child.length > 0
    }
  })
}


function getNextLevel(level: SomeWorkLevel): SomeWorkLevel {
  return (
    (level == 1) ? 2 :
      (level === 2) ? 3 : -1
  )
}

function isCorrectLevel(level: SomeWorkLevel): level is WorkLevel {
  return (level === 1 || level === 2 || level === 3)
}