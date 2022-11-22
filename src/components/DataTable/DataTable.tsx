import React from 'react'
import { TableHeader } from './TableHeader'

import './DataTable.styles.scss'

type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {

  return (
    <table className='data-table'>
      <TableHeader />
    </table>
  )

}

export { DataTable }