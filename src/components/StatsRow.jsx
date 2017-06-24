import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import { css } from 'glamor'
import { paddingSides5 } from './../styles'

export default class StatsRow extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    name: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    alert: PropTypes.bool
  }

  render () {
    return (
      <b.Row {...css({
        color: this.props.alert ? 'red' : ''
      })}>
        <b.Col
          {...paddingSides5}
          xs={8} className='text-left'>
          {this.props.imgSrc &&
          <img
            width={15}
            src={this.props.imgSrc} />}
          &nbsp;
          {this.props.name}
        </b.Col>
        <b.Col xs={4} className='text-right'>
          {this.props.amount}
        </b.Col>
      </b.Row>
    )
  }
}
