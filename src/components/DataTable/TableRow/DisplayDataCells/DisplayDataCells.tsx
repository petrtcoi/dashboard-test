import React from 'react'
import { ActionStatus, WorkId } from '../../../../typescript/work.type'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks/index'
import { selectWork } from '../../../../redux/slices/works/selectors/selectWork'
import { setActionStatus } from '../../../../redux/slices/works'
import { selectMeta } from '../../../../redux/slices/works/selectors/selectMeta'

type DisplayDataCellsProps = { workId: WorkId }

const DisplayDataCells: React.FC<DisplayDataCellsProps> = (props) => {

  const dispatch = useAppDispatch()
  const work = useAppSelector(selectWork(props.workId))
  const meta = useAppSelector(selectMeta(props.workId))
  const blocked = meta.status.action !== ActionStatus.Idle || meta.superStatus.action !== ActionStatus.Idle

  const handleClick = () => {
    if (blocked) return
    dispatch(setActionStatus({ workId: props.workId, status: ActionStatus.Editing }))
  }


  return (
    <>
      <td
        className='row_name'
        onDoubleClick={ handleClick }
      >
        { work.rowName } {blocked ? 'blocked' : ''}
      </td>
      <td>{ work.salary.toLocaleString() }</td>
      <td>{ work.materials.toLocaleString() }</td>
      <td>{ work.overheads.toLocaleString() }</td>
      <td>{ work.estimatedProfit.toLocaleString() }</td>
    </>
  )
}

export { DisplayDataCells }


