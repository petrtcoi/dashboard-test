import React from 'react'
import './Sidebar.styles.scss'
import { Project } from '../../typescript/project.type'

type SidebarProps = {
  projects: Project[]
}

const Sidebar: React.FC<SidebarProps> = (props) => {

  return (


    <nav className='sidebar'>
      <ul className='sidebar__projects-list'>
        { props.projects.map((project, index) => {

          const selected = project.title === 'СМР' ? "true" : "false"

          return (
            <li key={ index } data-selected={selected}>
              <span className='icon-project sidebar__projects-list__bullet'/>
              { project.title }
            </li>
          )
        }) }
      </ul>
    </nav>
  )
}

export { Sidebar }