import React from 'react'
import { WorkWithMeta } from '../DataTable.types'

type TableRowProps = {
  work: WorkWithMeta
}

const TableRow: React.FC<TableRowProps> = (props) => {

  return (
    <tr data-testid={ `work-${props.work.id}` }>
      <td data-testid={ `work-${props.work.id}-level` }>{ props.work.level }</td>
      <td data-testid={ `work-${props.work.id}-title` }>{ props.work.rowName }</td>
      <td data-testid={ `work-${props.work.id}-salary` }>{ props.work.salary }</td>
      <td data-testid={ `work-${props.work.id}-materials` }>{ props.work.materials }</td>
      <td data-testid={ `work-${props.work.id}-overheads` }>{ props.work.overheads }</td>
      <td data-testid={ `work-${props.work.id}-profit` }>{ props.work.estimatedProfit }</td>
    </tr>

  )

}

export { TableRow }