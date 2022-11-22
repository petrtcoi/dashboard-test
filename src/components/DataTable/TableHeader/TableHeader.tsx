import React from 'react'
import './TableHeader.styles.scss'

type TableHeaderProps = {}

const TableHeader: React.FC<TableHeaderProps> = (_props) => {

  return (
    <thead>
      <tr>
        <th id='level'>Уровень</th>
        <th id='project-title'>Наименование работ</th>
        <th id='salary'>Основная з/п</th>
        <th id='equipment'>Оборудование</th>
        <th id='overheads'>Накладные расходы</th>
        <th id='profit'>Сметная прибыль</th>
      </tr>
    </thead>
  )

}

export { TableHeader }