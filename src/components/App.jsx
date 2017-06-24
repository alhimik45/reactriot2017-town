import React, { Component } from 'react'
import { observer, PropTypes } from 'mobx-react'

@observer
export default class App extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    appState: PropTypes.observableObject.isRequired
  }

  render () {
    const appState = this.props.appState
    return (
      <h1>Hello world: {appState.counter}</h1>
    )
  }
}
