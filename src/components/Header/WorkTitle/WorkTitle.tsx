import React from 'react'
import './WorkTitle.styles.scss'

type WorkTitleProps = {}

const WorkTitle: React.FC<WorkTitleProps> = (_props) => {
  return (
    <div className='subheader_worktitle'>
      Строительно-монтажные работы
    </div>
  )
}

export { WorkTitle }