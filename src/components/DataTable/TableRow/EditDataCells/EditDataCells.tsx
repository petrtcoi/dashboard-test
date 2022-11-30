import React from 'react'
import { Work, WorkId } from '../../../../typescript/work.type'
import { connectUseForm } from './EditDataCells.service'
import './EditDataCells.styles.scss'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/index'
// import { createWork } from '../../../../redux/slices/works/index'
import { selectWork } from '../../../../redux/slices/works/selectors/selectWork'

type EditDataCellsProps = { workId: WorkId}

const EditDataCells: React.FC<EditDataCellsProps> = (props) => {

  const dispatch = useAppDispatch()
  const work = useAppSelector(selectWork(props.workId))
  const { register, getValues } = connectUseForm(work)


  React.useEffect(() => {
    const keyDownHandler = (event: { key: string; preventDefault: () => void }) => {
      if (event.key !== 'Enter') return
      event.preventDefault()
      // dispatch(createWork(({ ...props.work, ...getValues(), parentId: props.work._meta_.parentNode })))
    }
    document.addEventListener('keydown', keyDownHandler)
    return () => {
      document.removeEventListener('keydown', keyDownHandler)
    }
  }, [])

  return (
    <>
      <td>
        <input
          form='someform'
          type={ 'text' }
          placeholder='Укажите наименование работ'
          { ...register('rowName', { required: true }) }
        />
      </td>
      <td>
        <input
          type={ 'number' }
          min={ 0 }
          placeholder='Зарплата'
          { ...register('salary', { required: true, min: 0 }) }
        />
      </td>
      <td>
        <input
          type={ 'number' }
          min={ 0 }
          placeholder='Оборудование'
          { ...register('materials', { required: true, min: 0 }) }
        />
      </td>
      <td>
        <input
          type={ 'number' }
          min={ 0 }
          placeholder='Накл.расходы'
          { ...register('overheads', { required: true, min: 0 }) }
        />
      </td>
      <td>
        <input
          type={ 'number' }
          placeholder='Примерные доходы'
          { ...register('estimatedProfit', { required: true }) }
        />
      </td>

    </>
  )
}

export { EditDataCells }


