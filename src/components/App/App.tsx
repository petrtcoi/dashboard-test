import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import './App.styles.scss'

import { projects } from '../../data/projects'
import { DataTable } from '../DataTable'


export const App = () => {

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



