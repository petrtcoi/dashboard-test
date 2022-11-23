import React from 'react'
import { WorkWithMeta } from '../../DataTable.types'

type DisplayDataCellsProps = { work: WorkWithMeta }

const DisplayDataCells: React.FC<DisplayDataCellsProps> = (props) => {
  return (
    <>
      <td style={{overflow: "hidden", height: "40px"}}>{ props.work.rowName }</td>
      <td>{ props.work.salary.toLocaleString() }</td>
      <td>{ props.work.materials.toLocaleString() }</td>
      <td>{ props.work.overheads.toLocaleString() }</td>
      <td>{ props.work.estimatedProfit.toLocaleString() }</td>
    </>
  )
}

export { DisplayDataCells }


