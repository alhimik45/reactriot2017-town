import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import _ from 'lodash'

export default class TrainingMultiplier extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    numberOfSpeeds: PropTypes.number.isRequired,
    currentSpeed: PropTypes.number.isRequired,
    onMultiplierChange: PropTypes.func,
    nameFormatter: PropTypes.func.isRequired
  }

  render () {
    return (
      <b.ButtonGroup>
        {_.range(this.props.numberOfSpeeds).map(I =>
          <b.Button
            key={I}
            onClick={() => this.props.onMultiplierChange(I)}
            active={this.props.currentSpeed === I}>
            {this.props.nameFormatter(I)}
          </b.Button>
        )}
      </b.ButtonGroup>
    )
  }
}
