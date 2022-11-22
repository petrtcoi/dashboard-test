import React from 'react'
import { TableHeader } from './TableHeader'

import './DataTable.styles.scss'
import { WorkGetDto } from '../../typescript/work.type'

type DataTableProps = {
  works: WorkGetDto[]
}

const DataTable: React.FC<DataTableProps> = (props) => {
  console.log(props.works)
  return (
    <table className='data-table'>
      <TableHeader />
    </table>
  )

}

export { DataTable }