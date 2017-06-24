import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import { boldBorder } from './../styles'
import { css } from 'glamor'

export default class Building extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.number,
    upgrading: PropTypes.number,
    imgSrc: PropTypes.string,
    onLevelUp: PropTypes.func
  }

  render () {
    let imgBg = ''
    if (this.props.imgSrc) {
      imgBg = `url(${this.props.imgSrc}) no-repeat,`
    }
    const progress = this.props.upgrading || 0
    const background = css({
      background: `${imgBg} linear-gradient(to right, rgba(0,0,255,0.4) ${progress}%, #ffffff ${progress}%)`,
      backgroundSize: 'contain',
      backgroundPosition: 'center'
    })

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
