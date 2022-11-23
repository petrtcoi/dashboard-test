import React from 'react'
import { WorkWithMeta } from '../DataTable.types'
import { DisplayDataCells } from './DisplayDataCells'
import { EditDataCells } from './EditDataCells'
import { IconsCell } from './IconsCell'
import './TableRow.styles.scss'

type TableRowProps = {
  work: WorkWithMeta
}

const TableRow: React.FC<TableRowProps> = (props) => {

  const [editing, setEditing] = React.useState<boolean>(false)

  return (
    <tr onDoubleClick={ () => setEditing(true) } className="table-row">
      <IconsCell meta={ props.work._meta_ } parentId={ props.work.parentId } workId={ props.work.id } />
      { editing ?
        <EditDataCells work={ props.work } /> :
        <DisplayDataCells work={ props.work } />
      }
    </tr>

  )

}

export { TableRow }