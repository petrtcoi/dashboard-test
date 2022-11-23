import React from 'react'
import { useAppDispatch } from '../../../../redux/hooks'
import { preCreate } from '../../../../redux/slices/works'

import { WorkMeta, WorkWithMeta } from '../../DataTable.types'
import './IconsCell.styles.scss'

type IconsCellProps = {
  meta: WorkMeta
  parentId: WorkWithMeta['parentId']
  workId: WorkWithMeta['id']
}

const IconsCell: React.FC<IconsCellProps> = (props) => {

  const dispatch = useAppDispatch()

  const level = props.meta.level
  const folderType = level === 1 ? '' :
    props.meta.isLastChild ? 'child-last' : 'child'

  const iconThisLevel = () => (
    <div
      role='button'
      className={ `icon icon-level-${level}` }
      onClick={ () => dispatch(preCreate({ afterWorkId: props.workId, parentId: props.parentId, level: level })) }
    />
  )

  const iconNextLevel = () => level === 3 ?
    null :
    (
      <div
        role='button'
        className={ `icon icon-level-${level + 1}` }
        onClick={ () => dispatch(preCreate({ 
          parentId: props.workId, 
          afterWorkId: props.workId,
          // @ts-ignore
          level: level + 1 
        })) }
      />)


  const iconRemove = () => <div className={ `icon icon-remove` } />


  return (
    <td data-cell='icons'>
      <div className={ `level-${level}` } data-folder={ folderType }>

        <div className='folder-vertical-lines' />
        <div className='folder-horizontal-lines' />

        <div className='icons-area'>
          { iconThisLevel() }
          <div className='icons-extended'>
            { iconNextLevel() }
            { iconRemove() }
          </div>
        </div>

      </div>
    </td>
  )

}

export { IconsCell }

