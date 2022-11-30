import React from 'react'
import { ActionStatus, WorkId } from '../../../../typescript/work.type'
import { useAppSelector, useAppDispatch } from '../../../../redux/hooks/index'
import { selectWork } from '../../../../redux/slices/works/selectors/selectWork'
import { setActionStatus } from '../../../../redux/slices/works'

type DisplayDataCellsProps = { workId: WorkId }

const DisplayDataCells: React.FC<DisplayDataCellsProps> = (props) => {

  const dispatch = useAppDispatch()
  const work = useAppSelector(selectWork(props.workId))

  return (
    <>
      <td
      className='row_name'
        onDoubleClick={ () => dispatch(setActionStatus({ workId: props.workId, status: ActionStatus.Editing })) }
      >
        { work.rowName }
      </td>
      <td>{ work.salary.toLocaleString() }</td>
      <td>{ work.materials.toLocaleString() }</td>
      <td>{ work.overheads.toLocaleString() }</td>
      <td>{ work.estimatedProfit.toLocaleString() }</td>
    </>
  )
}

export { DisplayDataCells }


