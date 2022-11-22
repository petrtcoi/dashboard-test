import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from './redux/store'

import { App } from './components/App'

import './styles/main.scss'
// import './styles/base/icons.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>
)
