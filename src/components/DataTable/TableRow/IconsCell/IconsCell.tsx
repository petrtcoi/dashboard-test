import React from 'react'
import { useAppSelector } from '../../../../redux/hooks'
import { selectMeta } from '../../../../redux/slices/works/selectors/selectMeta'
import { WorkId } from '../../../../typescript/work.type'
// import { Work, WorkId, WorkMeta, getNextLevel } from '../../../../typescript/work.type'

// import { getNodeType } from './IconsCell.service'
// import { FolderLines } from './components/folderLines'

import './IconsCell.styles.scss'
// import { AddWorkButton } from './components/AddWorkButton'
// import { RemoveWorkButton } from './components/RemoveWorkButton'
// import { useAppSelector } from '../../../../redux/hooks/index'

const COL_WIDTH = 20


type IconsCellProps = {
  workId: WorkId
}

const IconsCell: React.FC<IconsCellProps> = (props) => {

  const meta = useAppSelector(selectMeta(props.workId))
  const marginLeft = `${(meta.nestingLevel - 1) * COL_WIDTH}px`

  return (
    <td className="icons_cell">
      <div
        style={{marginLeft}}
        className={ `folder icon-level-${meta.nestingLevel}` }
        data-nested={meta.nestingLevel > 1 ? 'true' : ''}
      />
    </td>
  )

}

//   const nodeType = getNodeType(props.meta.nextNode, props.meta.level)
//   const isParentNotLastChild = props.meta.parentNode === null ? false : isNodeIsLastChild(props.meta.parentNode) && props.meta.level === 3
//   const noWorks = isEmptyList()


//   return (
//     <td data-cell='icons'>
//       <div className={ `level-${props.meta.level}` } data-folder={ nodeType }>
//         <FolderLines nodeType={nodeType} isParentNotLastChild={isParentNotLastChild}/>

//         <div className='icons-area'>
//           <AddWorkButton meta={ props.meta } workId={ props.workId } />
//           <div className='icons-extended'>
//             <AddWorkButton nextLevel meta={ props.meta } workId={ props.workId } />
//             <RemoveWorkButton workId={ props.workId } disabled={ noWorks } />
//           </div>
//         </div>
//       </div>
//     </td>
//   )

// }

export { IconsCell }
