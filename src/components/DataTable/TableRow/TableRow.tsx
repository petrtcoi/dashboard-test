import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { ActionStatus, WorkId } from '../../../typescript/work.type'
import { DisplayDataCells } from './DisplayDataCells'
import { IconsCell } from './IconsCell'
import './TableRow.styles.scss'
import { selectIsWorkExist } from '../../../redux/slices/works/selectors/selectIsWorkExist'
import * as R from 'ramda'
import { watchSuperStatus } from './TableRow.service'
import { selectMeta } from '../../../redux/slices/works/selectors/selectMeta'
import { setSuperStatus } from '../../../redux/slices/works'
import { EditDataCells } from './EditDataCells'

type TableRowProps = {
  workId: WorkId
}

const TableRow: React.FC<TableRowProps> = (props) => {

  watchSuperStatus(props.workId)
  const isWorkExist = useAppSelector(selectIsWorkExist(props.workId))
  const meta = useAppSelector(selectMeta(props.workId))
  const dispatch = useAppDispatch()

  /** Сбрасывает счетчик initChange для обновления состояний всех node */
  // React.useEffect(() => {
  //   dispatch(setSuperStatus({ workId: props.workId, status: { ...meta.status, initChange: true } }))
  // }, [])


  if (R.isNil(isWorkExist)) return null
  return (
    <tr
      key={ props.workId }
      className="table-row"
    >
      <IconsCell workId={ props.workId } />
      {
        R.cond([
          [R.equals(ActionStatus.Editing), R.always(<EditDataCells workId={ props.workId } />)],
          [R.equals(ActionStatus.Creating), R.always(<EditDataCells workId={ props.workId } />)],
          [R.T, R.always(<DisplayDataCells workId={ props.workId } />)]
        ])(meta.status.action)
      }

    </tr>
  )

}

export { TableRow }