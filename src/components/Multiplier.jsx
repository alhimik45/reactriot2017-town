import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import _ from 'lodash/fp'

export default class Multiplier extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    elementsCount: PropTypes.number.isRequired,
    currentElement: PropTypes.number.isRequired,
    nameFormatter: PropTypes.func.isRequired,
    onMultiplierChange: PropTypes.func
  }

  render () {
    return (
      <b.ButtonGroup>
        {_.range(0, this.props.elementsCount).map(i =>
          <b.Button
            key={i}
            onClick={() => this.props.onMultiplierChange && this.props.onMultiplierChange(i)}
            active={this.props.currentElement === i}>
            {this.props.nameFormatter(i)}
          </b.Button>
        )}
      </b.ButtonGroup>
    )
  }
}
