import React, { Component } from 'react'
import { observer, PropTypes } from 'mobx-react'
import { noTextSelect } from './../styles'
import * as b from 'react-bootstrap'
import g from 'glamorous'

@observer
export default class App extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    appState: PropTypes.observableObject.isRequired
  }

  render () {
    return (
      <b.Row {...noTextSelect}>
        <b.Col xs={3}>
          <b.Row>
            <g.P fontSize='24px'>
              Training
            </g.P>
          </b.Row>
          <b.Row>
            !!UNIT COMPONENT!!
          </b.Row>
          <b.Row>
            <g.P fontSize='24px'>
              War
            </g.P>
          </b.Row>
        </b.Col>
        <b.Col xs={6}>
          Buildings
        </b.Col>
        <b.Col xs={3}>
          <b.Row>
            Resources
          </b.Row>
          <b.Row>
            Population
          </b.Row>
          <b.Row>
            Taxes
          </b.Row>
          <b.Row>
            Speed
          </b.Row>
        </b.Col>
      </b.Row>
    )
  }
}
