import React from 'react'

import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'

import { useAppSelector } from '../../redux/hooks/index'
import { selectWorkIdList } from '../../redux/slices/works/selectors/selectWorkIdList'

import './DataTable.styles.scss'




type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const workIdList = useAppSelector(selectWorkIdList)

 
  return (
    <table className='data-table'>
      <TableHeader />
      <tbody>
        { workIdList
          .map(workId =>
            <TableRow
              key={ workId }
              workId={ workId }
            />
          )
        }
      </tbody>
    </table>
  )
}

export { DataTable }

