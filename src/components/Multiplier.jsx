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
    tip: PropTypes.string.isRequired,
    onChange: PropTypes.func
  }

  render () {
    const tooltip = <b.Tooltip id='multiplier-tooltip'>
      {this.props.tip}
    </b.Tooltip>
    return (
      <b.OverlayTrigger placement='top' overlay={tooltip}>
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
      </b.OverlayTrigger>
    )
  }
}
