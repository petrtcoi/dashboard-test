import React from 'react'
import { TableHeader } from './TableHeader'
import { useGetWorksFlatList } from './DataTable.service'

import { WorkGetDto } from '../../typescript/work.type'
import './DataTable.styles.scss'
import { TableRow } from './TableRow'



type DataTableProps = {
  works: WorkGetDto[]
}

const DataTable: React.FC<DataTableProps> = (props) => {

  const works = useGetWorksFlatList(props.works)

  return (
    <table className='data-table'>
      <TableHeader />
      <tbody>
        { works.map(work => <TableRow key={ work.id } work={ work } />) }
      </tbody>
    </table>
  )

}

export { DataTable }