import React from 'react'
import { WorkGetDto } from '../../typescript/work.type'
import { SomeWorkLevel, getNextLevel, WorkLevel, WorkWithMeta, isCorrectLevel } from './DataTable.types'



/**
 *  Перобразует JSON работ в плоский массив, дополняя работы мета-данными
 *  Работы, которые выходят за допустимый уровень вложенности - игнорируются
 */
export const useGetWorksFlatList = (dtoWorks: WorkGetDto[]): WorkWithMeta[] => {
  const [works, setWorks] = React.useState<WorkWithMeta[]>([])

  React.useEffect(() => {
    setWorks(getWorksWithMetaFlatList(dtoWorks))
  }, [dtoWorks])

  return works
}





const getWorksWithMetaFlatList = (works: WorkGetDto[]): WorkWithMeta[] => {
  return works.map(work => unpackWork(work, 1)).flat()
}


function unpackWork(work: WorkGetDto, level: SomeWorkLevel): WorkWithMeta[] {
  if (!isCorrectLevel(level)) return []

  return [
    addMeta(work, level),
    ...work.child
      .map(workChild => unpackWork(workChild, getNextLevel(level)))
      .flat()
  ]
}


function addMeta(work: WorkGetDto, level: WorkLevel): WorkWithMeta {
  return ({
    ...work,
    _meta_: {
      level,
      haveChild: work.child.length > 0
    }
  })
}
