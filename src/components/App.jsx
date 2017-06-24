import React, { Component } from 'react'
import { observer, PropTypes } from 'mobx-react'
import { noTextSelect } from './../styles'
import * as b from 'react-bootstrap'
import g from 'glamorous'
import DevTools from 'mobx-react-devtools'
import Multiplier from './Multiplier'

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
            <b.Col xs={12}>
              <g.P fontSize='24px'>
                Training
              </g.P>
              <Multiplier
                elementsCount={3}
                currentElement={1}
                nameFormatter={i => 'x' + 10 ** i} />
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              !!UNIT COMPONENT!!
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <g.P fontSize='24px'>
                War
              </g.P>
            </b.Col>
          </b.Row>
        </b.Col>
        <b.Col xs={6}>
          <g.P fontSize='24px'>
            Buildings
          </g.P>
        </b.Col>
        <b.Col xs={3}>
          <b.Row>
            <b.Col xs={12}>
              Resources
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              Population
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              Taxes
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <g.P fontSize='24px'>
                Speed
              </g.P>
              <Multiplier
                elementsCount={3}
                currentElement={1}
                nameFormatter={i => (i + 1) + 'x'} />
            </b.Col>
          </b.Row>
        </b.Col>
        <DevTools />
      </b.Row>
    )
  }
}
