import React, { Component } from 'react'
import { observer, PropTypes } from 'mobx-react'
import { noTextSelect } from './../styles'

@observer
export default class App extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    appState: PropTypes.observableObject.isRequired
  }

  render () {
    const appState = this.props.appState
    return (
      <div {...noTextSelect}>
        <h1>Hello world: {appState.counter}</h1>
      </div>
    )
  }
}
