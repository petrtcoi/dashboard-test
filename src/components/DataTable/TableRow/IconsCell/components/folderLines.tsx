import React from 'react'

type Props =  {nodeType: string, isParentNotLastChild: boolean }
export const FolderLines: React.FC<Props> = (props: Props) => {
  return (
    <>
      <div className='horizontal-line' />

      { props.nodeType === 'child-last' &&
        <div className='line-last-child' />
      }
      { props.nodeType === 'child' &&
        <div className='line-child' />
      }
      { props.isParentNotLastChild &&
        <div className='line-2nd' />
      }
    </>
  )
}