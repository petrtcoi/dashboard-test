import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './components/App'

import './styles/main.scss'
// import './styles/base/icons.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
