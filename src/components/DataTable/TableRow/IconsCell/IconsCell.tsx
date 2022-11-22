import React from 'react'
import { WorkMeta, WorkLevel } from '../../DataTable.types'
import './IconsCell.styles.scss'

type IconsCellProps = {
  meta: WorkMeta
}

const IconsCell: React.FC<IconsCellProps> = (props) => {

  const level = props.meta.level
  const folderType = level === 1 ? '' :
    props.meta.isLastChild ? 'child-last' : 'child'

  const iconLevel = (level: WorkLevel) => <div className={ `icon icon-level-${level}` } />
  const iconLevel2 = () => level !== 1 ? null : iconLevel(2)
  const iconLevel3 = () => level === 3 ? null : iconLevel(3)
  const iconRemove = () => <div className={ `icon icon-remove` } />


  return (
    <td data-cell='icons'>
      <div className={ `level-${level}` } data-folder={ folderType }>

        <div className='folder-vertical-lines' />
        <div className='folder-horizontal-lines' />

        <div className='icons-area'>
          { iconLevel(level) }
          <div className='icons-extended'>
            { iconLevel2() }
            { iconLevel3() }
            { iconRemove() }
          </div>
        </div>

      </div>
    </td>
  )

}

export { IconsCell }

