import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import g from 'glamorous'

export default class StatsRow extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired
  }

  render () {
    return (
      <b.Row>
        <b.Col xs={9}>
          <g.Img
            src={this.props.img} />
          {this.props.name}
        </b.Col>
        <b.Col xs={3}>
          {this.props.amount}
        </b.Col>
      </b.Row>
    )
  }
}
