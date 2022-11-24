import React from 'react'
import { useAppSelector } from '../../../redux/hooks'
import { WorkId, WorkStatus } from '../../../typescript/work.type'
import { DisplayDataCells } from './DisplayDataCells'
import { EditDataCells } from './EditDataCells'
import { IconsCell } from './IconsCell'
import './TableRow.styles.scss'

type TableRowProps = {
  workId: WorkId
}

const TableRow: React.FC<TableRowProps> = (props) => {

  const [editing, setEditing] = React.useState<boolean>(false)
  const work = useAppSelector(state => state.works.byId[props.workId]) || null
  if (work === null) return null

  return (
    <tr
      key={ props.workId }
      className="table-row"
      onDoubleClick={ () => setEditing(true) }
    >
      <IconsCell meta={ work._meta_ } workId={ work.id } />
      { work._meta_.status === WorkStatus.Creating ?
        <EditDataCells work={ work } /> :
        <DisplayDataCells work={ work } />
      }
    </tr>

  )

}

export { TableRow }