import React from 'react'
import { isDisabled } from './IconCell.service'

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks'
import { deleteWork, preCreateWork } from '../../../../redux/slices/works/'
import { selectMeta } from '../../../../redux/slices/works/selectors/selectMeta'
import { ActionStatus, WorkId } from '../../../../typescript/work.type'


import { isNestedLevelCorrect } from '../../../../redux/slices/works/utils/isNestedLevelCorrect'


import './IconsCell.styles.scss'
import { selectIsOnWork } from '../../../../redux/slices/works/selectors/selectIsOnWork'



const COL_WIDTH = 20


type IconsCellProps = {
  workId: WorkId
}

const IconsCell: React.FC<IconsCellProps> = (props) => {

  const dispatch = useAppDispatch()
  const meta = useAppSelector(selectMeta(props.workId))
  const isOnWork = useAppSelector(selectIsOnWork)

  const paddingLeft = `${(meta.nestingLevel - 1) * COL_WIDTH}px`

  const handleDelete = () => dispatch(deleteWork({ workId: props.workId }))
  const handlePreCreateChild = () => dispatch(preCreateWork({ parentNode: props.workId }))
  const handlePreCreateSibling = () => dispatch(preCreateWork({ prevNode: props.workId }))


  return (
    <td className='icons_cell' style={ { paddingLeft } }>
      <div className='icons-area'>
        <button
          disabled={ isDisabled(meta) || isOnWork }
          role='button'
          className={ `icon-button icon-level-${meta.nestingLevel}` }
          onClick={ handlePreCreateSibling }
        >
          { meta.nestingLevel > 1 &&
            <div className='line horizontal' />
          }
          { meta.nestingLevel > 1 &&
            <div className='line up_to_parent' />
          }
          { meta.firstChildNode &&
            <div className='line down_to_child' />
          }
          { meta.nextNode &&
            meta.nestingLevel > 1 &&
            <div className='line between_siblings' />
          }
          { (meta.superStatus.drawBetweenUpperSiblings === true &&
            meta.nestingLevel === 3) &&
            <div className='line between_upper_siblings' />
          }
        </button>
        { isNestedLevelCorrect(meta.nestingLevel + 1) &&
          <button
            disabled={ isDisabled(meta) || isOnWork }
            role='button'
            className={ `icon-button icon-level-${meta.nestingLevel + 1} icon-extended` }
            onClick={ handlePreCreateChild }
          />
        }
        <button
          disabled={ (isDisabled(meta) && meta.status.action !== ActionStatus.Creating) || isOnWork }
          role='button'
          className={ `icon-button icon-remove icon-extended` }
          onClick={ handleDelete }
        />
      </div>


    </td>
  )

}


export { IconsCell }
