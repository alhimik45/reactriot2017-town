import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import { boldBorder } from './../styles'
import { css } from 'glamor'

export default class Building extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    name: PropTypes.string.isRequired,
    upgradeAvailable: PropTypes.bool.isRequired,
    level: PropTypes.number,
    upgradeProgress: PropTypes.number,
    imgSrc: PropTypes.string,
    onUpgradeClick: PropTypes.func
  }

  render () {
    let imgBg = ''
    if (this.props.imgSrc) {
      imgBg = `url(${this.props.imgSrc}) no-repeat,`
    }
    const progress = this.props.upgradeProgress || 0
    const background = css({
      background: `${imgBg} linear-gradient(to right, rgba(0,0,255,0.4) ${progress}%, #ffffff ${progress}%)`,
      backgroundSize: 'contain',
      backgroundPosition: 'center'
    })
    const fullVisibility = css({
      opacity: !this.props.upgradeAvailable && (!this.props.level || this.props.level === 0) ? 0.5 : 1
    })

    const buttonVisibility = css({
      opacity: !this.props.upgradeAvailable && this.props.level ? 0.5 : 1
    })

    return (
      <div {...css(boldBorder, background, fullVisibility)}>
        <div className='text-center'>
          {this.props.name}
        </div>
        <b.Row>
          <b.Col xs={6} className='text-center'>
            <img
              {...buttonVisibility}
              src='/static/plus.svg'
              width={25}
              onClick={this.props.onUpgradeClick}
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
