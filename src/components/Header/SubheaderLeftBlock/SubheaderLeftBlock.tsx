import React from 'react'
import './SubheaderLeftBlock.styles.scss'

type SubheaderLeftBlockProps = {}

const SubheaderLeftBlock: React.FC<SubheaderLeftBlockProps> = (_props) => {
  return (
    <div className='subheader_left-block'>
      <div>
        <div className='subheader_left-block__header'>
          Название проекта
        </div>
        <div className='subheader_left-block__subheader'>
          Аббревиатура
        </div>
      </div>
      <div className='subheader_left-block__icon'>
        <span className='icon-arrow-down'/>
      </div>
    </div>
  )
}

export { SubheaderLeftBlock }