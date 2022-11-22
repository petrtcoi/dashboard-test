import React from 'react'
import { WorkWithMeta } from '../DataTable.types'
import './TableRow.styles.scss'

type TableRowProps = {
  work: WorkWithMeta
}

const TableRow: React.FC<TableRowProps> = (props) => {

  const folderType = props.work._meta_.level === 1 ? '' :
    props.work._meta_.isLastChild ? 'child-last' : 'child'


  return (
    <tr data-testid={ `work-${props.work.id}` }>
      <td data-testid={ `work-${props.work.id}-level` } >
        <div className={ `level-${props.work._meta_.level}` } data-folder={ folderType }>
          <span className='folder-vertical-lines' />
          <span className='folder-horizontal-lines' />
          <span className={ `folder-icon icon-level-${props.work._meta_.level}` } />
        </div>
      </td>
      <td data-testid={ `work-${props.work.id}-title` }>{ props.work.rowName } { props.work._meta_.isLastChild ? 'last' : 'sibling' }</td>
      <td data-testid={ `work-${props.work.id}-salary` }>{ props.work.salary }</td>
      <td data-testid={ `work-${props.work.id}-materials` }>{ props.work.materials }</td>
      <td data-testid={ `work-${props.work.id}-overheads` }>{ props.work.overheads }</td>
      <td data-testid={ `work-${props.work.id}-profit` }>{ props.work.estimatedProfit }</td>
    </tr>

  )

}

export { TableRow }