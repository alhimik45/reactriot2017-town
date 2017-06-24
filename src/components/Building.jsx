import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import * as b from 'react-bootstrap'
import { boldBorder } from './../styles'
import { css } from 'glamor'

@observer
export default class Building extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.number,
    imgSrc: PropTypes.string,
    onLevelUp: PropTypes.func
  }

  render () {
    let backgroundStyle = {}
    if (this.props.imgSrc) {
      backgroundStyle = css({
        background: `url(${this.props.imgSrc}) no-repeat`,
        backgroundSize: 'contain',
        backgroundPosition: 'center'
      })
    }
    const background = css(backgroundStyle)
    return (
      <div {...css(boldBorder, background)}>
        <div className='text-center'>
          {this.props.name}
        </div>
        <b.Row>
          <b.Col xs={6} className='text-center'>
            <img
              src='/static/plus.svg'
              width={25}
              onClick={this.props.onLevelUp}
            />
          </b.Col>
          <b.Col xs={6} className='text-center'>
            {this.props.level || 0}
          </b.Col>
        </b.Row>
      </div>
    )
  }
}
