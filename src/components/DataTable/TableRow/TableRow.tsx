import React from 'react'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '../../../redux/hooks'
import { WorkId, WorkStatus } from '../../../typescript/work.type'
import { DisplayDataCells } from './DisplayDataCells'
import { EditDataCells } from './EditDataCells'
import { IconsCell } from './IconsCell'
import './TableRow.styles.scss'
import { selectIsWorkExist } from '../../../redux/slices/works/selectors/selectIsWorkExist'
import * as R from 'ramda'

type TableRowProps = {
  workId: WorkId
}

const TableRow: React.FC<TableRowProps> = (props) => {

  const isWorkExist = useAppSelector(selectIsWorkExist(props.workId))

  if (R.isNil(isWorkExist)) return null
  return (
    <tr
      key={ props.workId }
      className="table-row"
    // onDoubleClick={ () => setEditing(true) }
    >
      <IconsCell workId={ props.workId } /> 
      <DisplayDataCells workId={ props.workId } />
      {/* <IconsCell meta={ work._meta_ } workId={ work.id } />
      { prevNodeStatus }
      { work._meta_.status === WorkStatus.Creating ?
        <EditDataCells work={ work } /> :
        <DisplayDataCells work={ work } />
      } */}
    </tr>

  )

}

export { TableRow }