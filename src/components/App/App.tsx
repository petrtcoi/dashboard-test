import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { DataTable } from '../DataTable'

import { projects } from '../../data/projects'
import './App.styles.scss'
import { useFetchData } from './App.service'


export const App = () => {

  useFetchData()

  return (
    <div className='layout'>
      <Header />
      <main className="main-block">
        <Sidebar projects={ projects } />
        <DataTable />
      </main>
    </div>
  )
}



