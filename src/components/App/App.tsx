import React from 'react'

import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { DataTable } from '../DataTable'

import * as api from './../../api/server'

import { projects } from '../../data/projects'

import './App.styles.scss'
import { WorkGetDto } from '../../typescript/work.type'
import { isApiError } from '../../api/typings/api.type'


export const App = () => {

  const [works, setWorks] = React.useState<WorkGetDto[]>([])
  const [errorMessage, setErrorMessage] = React.useState<string>('')

  React.useEffect(() => {
    (async () => {
      const result = await api.row.getList()
      if (isApiError(result)) {
        setErrorMessage(result.error)
        return
      }
      setWorks(result)
    })()
  }, [])


  return (
    <div className='layout'>
      <Header />
      <main className="main-block">
        <Sidebar projects={ projects } />
        <DataTable works={ works } />
      </main>
    </div>
  )
}



