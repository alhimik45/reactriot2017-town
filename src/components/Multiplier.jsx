import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import L from 'lazy.js'

export default class Multiplier extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    elements: PropTypes.array.isRequired,
    current: PropTypes.number.isRequired,
    nameFormatter: PropTypes.func.isRequired,
    onChange: PropTypes.func
  }

  render () {
    return (
      <b.ButtonGroup>
        {L(this.props.elements).map(n =>
          <b.Button
            key={n}
            onClick={() => this.props.onChange && this.props.onChange(n)}
            active={this.props.current === n}>
            {this.props.nameFormatter(n)}
          </b.Button>
        ).toArray()}
      </b.ButtonGroup>
    )
  }
}
