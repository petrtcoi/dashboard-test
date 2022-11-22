import { Header } from '../Header'
import { Sidebar } from '../Sidebar'
import './App.styles.scss'

import { projects } from '../../data/projects'


export const App = () => {

  return (
    <div className='layout'>
      <Header />
      <main className="main-block">
        <Sidebar projects={projects } />
      </main>
    </div>
  )
}



