import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { boldBorder } from './../styles'
import passthrough from 'react-passthrough'

@passthrough()
export default class ImageProgressBar extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    imgSrc: PropTypes.string.isRequired,
    progress: PropTypes.number
  }

  render () {
    let imgBg = ''
    if (this.props.imgSrc) {
      imgBg = `, url(${this.props.imgSrc}) center no-repeat`
    }
    const progress = this.props.progress || 0

    return (
      <div
        {...this.passthrough()}
        {...boldBorder}
        style={{
          background: `linear-gradient(to right, rgba(0,0,255,0.4) ${progress}%, rgba(255,255,255,0.0) ${progress}%) ${imgBg}`,
          backgroundSize: 'contain',
          backgroundPosition: 'center'
        }}>
        {this.props.children}
      </div>
    )
  }
}
