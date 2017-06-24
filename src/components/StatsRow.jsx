import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import { css } from 'glamor'

export default class StatsRow extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    name: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    alert: PropTypes.bool
  }

  render () {
    return (
      <b.Row {...css({color: this.props.alert ? 'red' : ''})}>
        <b.Col xs={9} className='text-left'>
          <img
            width={15}
            src={this.props.imgSrc} />
          {this.props.name}
        </b.Col>
        <b.Col xs={3}>
          {this.props.amount}
        </b.Col>
      </b.Row>
    )
  }
}
