import React from 'react'

import { TableHeader } from './TableHeader'
import { TableRow } from './TableRow'

import { useAppDispatch, useAppSelector } from '../../redux/hooks/index'
import { selectWorkIdList } from '../../redux/slices/works/selectors/selectWorkIdList'

import './DataTable.styles.scss'
import { shallowEqual } from 'react-redux'




type DataTableProps = {}

const DataTable: React.FC<DataTableProps> = (_props) => {

  const workIdList = useAppSelector(selectWorkIdList, shallowEqual)  
 
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

