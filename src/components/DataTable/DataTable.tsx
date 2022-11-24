import React from 'react'
import { TableHeader } from './TableHeader'

import { TableRow } from './TableRow'

import { useAppSelector } from '../../redux/hooks/index'

import './DataTable.styles.scss'
import { useCreateFirstWork } from './DataTable.service'
import { Work, WorkId } from '../../typescript/work.type'


type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const worksById = useAppSelector(state => state.works.byId)
  const worksQnty = useAppSelector(state => Object.keys(state.works.byId).length)
  const fetched = useAppSelector(state => state.works.fetched)
  useCreateFirstWork(Object.keys(worksById).length, fetched)


  const [worksIds, setWorksIds] = React.useState<WorkId[]>([])
  React.useEffect(() => {
    const entryWork = Object
      .values(worksById)
      .find(work => work._meta_.level === 1 && work._meta_.prevNode === null)
    if (entryWork === undefined) return
    setWorksIds(extractRootWork(entryWork.id))
  }, [worksById, worksQnty])


  function extractRootWork (workId: WorkId): WorkId[] {

    const nextNode = worksById[workId]._meta_.nextNode
    if (nextNode === null) return extractIds(workId)
    return [
      ...extractIds(workId),
      ...extractRootWork(nextNode)
    ]
  }

  function extractIds(workId: WorkId): WorkId[] {
    return [
      workId,
      ...worksById[workId]._meta_.childNodes
        .map(childId => extractIds(childId))
        .flat()
    ]
  }



  return (
    <table className='data-table'>
      { worksQnty } / { worksIds.length }
      <TableHeader />
      <tbody>
        { worksIds.map(workId => <TableRow key={ workId } workId={ workId } />) }
      </tbody>
    </table>
  )

}

export { DataTable }

