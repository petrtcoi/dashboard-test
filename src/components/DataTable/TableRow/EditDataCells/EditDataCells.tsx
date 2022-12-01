import React from 'react'
import { ActionStatus, WorkId } from '../../../../typescript/work.type'
import { connectUseForm, useListenKeyboard } from './EditDataCells.service'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks/index'
import { selectWork } from '../../../../redux/slices/works/selectors/selectWork'

import './EditDataCells.styles.scss'
import { setActionStatus, updateWork } from '../../../../redux/slices/works'


type EditDataCellsProps = { workId: WorkId }

const EditDataCells: React.FC<EditDataCellsProps> = (props) => {

  const dispatch = useAppDispatch()
  const work = useAppSelector(selectWork(props.workId))
  const { register, getValues } = connectUseForm(work)

  const saveUpdates = () => {
    dispatch(updateWork({ workId: props.workId, data: getValues() }))
  }
  const cancelEditing = () => {
    dispatch(setActionStatus({ workId: props.workId, status: ActionStatus.Idle }))
  }

  useListenKeyboard(saveUpdates, cancelEditing)



  return (
    <>
      <td>
        <form id='work_input' />
        <input
          width="200px"
          form='work_input'
          type={ 'text' }
          placeholder='Укажите наименование работ'
          { ...register('rowName', { required: true }) }
        />
      </td>
      <td>
        <input
          form='work_input'
          type={ 'number' }
          min={ 0 }
          placeholder='Зарплата'
          { ...register('salary', { required: true, min: 0 }) }
        />
      </td>
      <td>
        <input
          form='work_input'
          type={ 'number' }
          min={ 0 }
          placeholder='Оборудование'
          { ...register('materials', { required: true, min: 0 }) }
        />
      </td>
      <td>
        <input
          form='work_input'
          type={ 'number' }
          min={ 0 }
          placeholder='Накл.расходы'
          { ...register('overheads', { required: true, min: 0 }) }
        />
      </td>
      <td>
        <input
          form='work_input'
          type={ 'number' }
          placeholder='Примерные доходы'
          { ...register('estimatedProfit', { required: true }) }
        />
      </td>

    </>
  )
}

export { EditDataCells }

