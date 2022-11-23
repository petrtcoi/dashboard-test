import React from 'react'
import { useAppDispatch } from '../../../../redux/hooks'
import { Work, WorkId, WorkMeta } from '../../../../typescript/work.type'

import './IconsCell.styles.scss'
import { useAppSelector } from '../../../../redux/hooks/index'
import { getNodeType } from './IconsCell.service'
import { preCreate } from '../../../../redux/slices/works'
import { removeWork } from '../../../../redux/slices/works/methods/remove'

type IconsCellProps = {
  meta: WorkMeta
  workId: Work['id']
}

const IconsCell: React.FC<IconsCellProps> = (props) => {

  const dispatch = useAppDispatch()
  const nodeType = getNodeType(props.meta.nextNode, props.meta.level)
  let isParentNotLastChild = false
  if (props.meta.level === 3) {
    const parent = useAppSelector(state => state.works.byId[props.meta.parentNode as WorkId])
    if (parent._meta_.nextNode !== null) isParentNotLastChild = true
  }


  const iconThisLevel = () => (
    <div
      role='button'
      className={ `icon icon-level-${props.meta.level}` }
      onClick={ () => {
        dispatch(preCreate({
          prevNode: props.workId,
          nextNode: props.meta.nextNode,
          parentId: props.meta.parentNode,
          level: props.meta.level
        }))
      }
      }
    />
  )

  const iconNextLevel = () => props.meta.level === 3 ?
    null :
    (
      <div
        role='button'
        className={ `icon icon-level-${props.meta.level + 1}` }
      // onClick={ () => dispatch(preCreate({ 
      //   parentId: props.workId, 
      //   afterWorkId: props.workId,
      //   // @ts-ignore
      //   level: level + 1 
      // })) }
      />)


  const iconRemove = () => <div
    role="btton"
    className={ `icon icon-remove` }
    onClick={ () => dispatch(removeWork(props.workId)) }

  />


  return (
    <td data-cell='icons'>
      <div className={ `level-${props.meta.level}` } data-folder={ nodeType }>
        {/* <div className='folder-vertical-lines' /> */ }
        <div className='horizontal-line' />

        { nodeType === 'child-last' &&
          <div className='line-last-child' />
        }
        { nodeType === 'child' &&
          <div className='line-child' />
        }
        { isParentNotLastChild &&
          <div className='line-2nd' />
        }

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
