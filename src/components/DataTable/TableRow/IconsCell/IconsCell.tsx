import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { selectMeta } from '../../../../redux/slices/works/selectors/selectMeta'
import { WorkId } from '../../../../typescript/work.type'
import { AddWorkButton } from './components/AddWorkButton'
import { RemoveWorkButton } from './components/RemoveWorkButton'
// import { Work, WorkId, WorkMeta, getNextLevel } from '../../../../typescript/work.type'

// import { getNodeType } from './IconsCell.service'
// import { FolderLines } from './components/folderLines'

import './IconsCell.styles.scss'
// import { AddWorkButton } from './components/AddWorkButton'
// import { RemoveWorkButton } from './components/RemoveWorkButton'
// import { useAppSelector } from '../../../../redux/hooks/index'
import { isNestedLevelCorrect } from '../../../../redux/slices/works/utils/isNestedLevelCorrect'
import { isDisabled } from './IconCell.service'

const COL_WIDTH = 20


type IconsCellProps = {
  workId: WorkId
}

const IconsCell: React.FC<IconsCellProps> = (props) => {

  const meta = useAppSelector(selectMeta(props.workId))
  const paddingLeft = `${(meta.nestingLevel - 1) * COL_WIDTH}px`



  return (
    <td className='icons_cell' style={ { paddingLeft } }>
      <div className='icons-area'>
        <button
          disabled={ isDisabled(meta) }
          role='button'
          className={ `icon-button icon-level-${meta.nestingLevel}` }
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
          { meta.superStatus.drawBetweenUpperSiblings === true &&
            meta.nestingLevel === 3 &&
            <div className='line between_upper_siblings' />
          }
        </button>
        { isNestedLevelCorrect(meta.nestingLevel + 1) &&
          <button
            disabled={ isDisabled(meta) }
            role='button'
            className={ `icon-button icon-level-${meta.nestingLevel + 1} icon-extended` }
          />
        }
        <button
          disabled={ isDisabled(meta) }
          role='button'
          className={ `icon-button icon-remove icon-extended` }
        />
      </div>


    </td>
  )

}


export { IconsCell }
