import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'
import * as g from 'glamorous'
import * as b from 'react-bootstrap'
import Disabler from './Disabler'
import ImageProgressBar from './ImageProgressBar'

export default class Unit extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    name: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    trainingAvailable: PropTypes.bool,
    trainingProgress: PropTypes.number,
    queueSize: PropTypes.number,
    onTrainClick: PropTypes.func
  }

  render () {
    const tooltip = <b.Tooltip id={this.props.name + 'tooltip'}>
      <g.B>{this.props.name}</g.B>
      <br />
      <g.B>Cost:</g.B>
      {this.props.cost}<br />
      {this.props.description}
    </b.Tooltip>
    return (
      <Disabler enabled={this.props.trainingAvailable}>
        <b.OverlayTrigger placement='right' overlay={tooltip}>
          <ImageProgressBar
            {...css({ width: '70px', height: '70px' })}
            onClick={this.props.onTrainClick}
            imgSrc={this.props.imgSrc}
            progress={this.props.trainingProgress}>
            {
              this.props.queueSize
                ? <g.Span
                  padding='2px'
                  margin='2px'
                  borderRadius='7px'
                  fontSize='20px'
                  color='white'
                  backgroundColor='rgba(10,10,10,0.5)'>
                  {this.props.queueSize}
                </g.Span>
                : null
            }
          </ImageProgressBar>
        </b.OverlayTrigger>
      </Disabler>
    )
  }
}
