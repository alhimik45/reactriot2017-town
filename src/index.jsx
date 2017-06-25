import React from 'react'
import { render } from 'react-dom'
import AppState from './logic/AppState'
import App from './components/App'
import { useStrict } from 'mobx'

useStrict(true)

const appState = new AppState()

// document.body.style.overflow = 'hidden'

render(
  <App appState={appState} />,
  document.getElementById('root')
)
