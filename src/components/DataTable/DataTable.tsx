import React from 'react'
import { TableHeader } from './TableHeader'

import { TableRow } from './TableRow'
import { useAppSelector } from '../../redux/hooks/index'

import './DataTable.styles.scss'




type DataTableProps = {
}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const works = useAppSelector(state => state.works.works)

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