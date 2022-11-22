
import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import { DataTable } from '../DataTable'

import { useFetchWorks } from './App.service'

import { projects } from '../../data/projects'

import './App.styles.scss'


export const App = () => {

  const [works, _errorMessage] = useFetchWorks()


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



