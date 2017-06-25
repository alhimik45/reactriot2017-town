import React, { Component } from 'react'
import * as b from 'react-bootstrap'
import { css } from 'glamor'
import { observer, PropTypes as MPropTypes } from 'mobx-react'
import { paddingSides5 } from './../styles'

@observer
export default class StatsRow extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    stats: MPropTypes.objectOrObservableObject.isRequired
  }

  render () {
    const {stats} = this.props
    return (
      <b.Row {...css({
        color: stats.alert ? 'red' : ''
      })}>
        <b.Col
          {...paddingSides5}
          xs={7}
          className='text-left'>
          {stats.imgSrc &&
          <img
            width={15}
            src={stats.imgSrc} />}
          &nbsp;
          {stats.name}
        </b.Col>
        <b.Col
          {...paddingSides5}
          xs={5}
          className='text-right'>
          {stats.amount}
        </b.Col>
      </b.Row>
    )
  }
}
