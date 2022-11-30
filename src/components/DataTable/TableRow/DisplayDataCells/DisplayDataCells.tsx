import React from 'react'
import { WorkId } from '../../../../typescript/work.type'
import { useAppSelector } from '../../../../redux/hooks/index'
import { selectWork } from '../../../../redux/slices/works/selectors/selectWork'

type DisplayDataCellsProps = { workId: WorkId }

const DisplayDataCells: React.FC<DisplayDataCellsProps> = (props) => {

  const work = useAppSelector(selectWork(props.workId))

  return (
    <>
      <td style={ { overflow: "hidden", height: "40px" } }>{ work.rowName }</td>
      <td>{ work.salary.toLocaleString() }</td>
      <td>{ work.materials.toLocaleString() }</td>
      <td>{ work.overheads.toLocaleString() }</td>
      <td>{ work.estimatedProfit.toLocaleString() }</td>
    </>
  )
}

export { DisplayDataCells }


