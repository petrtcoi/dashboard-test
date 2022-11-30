import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { WorkId } from '../../../typescript/work.type'
import { DisplayDataCells } from './DisplayDataCells'
import { IconsCell } from './IconsCell'
import './TableRow.styles.scss'
import { selectIsWorkExist } from '../../../redux/slices/works/selectors/selectIsWorkExist'
import * as R from 'ramda'
import { watchSuperStatus } from './TableRow.service'
import { selectMeta } from '../../../redux/slices/works/selectors/selectMeta'
import { selectSuperStatus } from '../../../redux/slices/works/selectors/selectSuperStatus'
import { setSuperStatus } from '../../../redux/slices/works'

type TableRowProps = {
  workId: WorkId
}

const TableRow: React.FC<TableRowProps> = (props) => {

  watchSuperStatus(props.workId)
  const isWorkExist = useAppSelector(selectIsWorkExist(props.workId))
  const meta = useAppSelector(selectMeta(props.workId))
  const dispatch = useAppDispatch()

  /** Сбрасывает счетчик initChange для обновления состояний всех node */
  React.useEffect(() => {
    dispatch(setSuperStatus({ workId: props.workId, status: { ...meta.status, initChange: true } }))
  }, [])


  
  if (R.isNil(isWorkExist)) return null
  return (
    <tr
      key={ props.workId }
      className="table-row"
      // onDoubleClick={ () => dispatch(setSuperStatus({ workId: props.workId, status: { ...meta.status, initChange: true } })) }
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