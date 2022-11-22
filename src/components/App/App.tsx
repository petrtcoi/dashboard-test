import React from 'react'

import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { DataTable } from '../DataTable'

import { useFetchWorks } from './App.service'
import { projects } from '../../data/projects'
import './App.styles.scss'
import { useAppDispatch } from '../../redux/hooks'
import { fetchAllWorks } from '../../redux/slices/works'


export const App = () => {

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    console.log('HEY')
    dispatch(fetchAllWorks())
  },[])

  return (
    <div className='layout'>
      <Header />
      <main className="main-block">
        <Sidebar projects={ projects } />
        <DataTable  />
      </main>
    </div>
  )
}



