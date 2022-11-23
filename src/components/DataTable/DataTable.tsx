import React from 'react'
import { TableHeader } from './TableHeader'

import { TableRow } from './TableRow'
import { useAppSelector } from '../../redux/hooks/index'

import './DataTable.styles.scss'




type DataTableProps = {
}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const worksIds = useAppSelector(state => state.works.ids)

  return (
    <table className='data-table'>
      <TableHeader />
      <tbody>
        { worksIds.map(workId => <TableRow key={ workId } workId={ workId } />) }
      </tbody>
    </table>
  )

}

export { DataTable }