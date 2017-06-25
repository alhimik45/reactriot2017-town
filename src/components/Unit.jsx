import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { PropTypes as MPropTypes, observer } from 'mobx-react'
import { css } from 'glamor'
import * as g from 'glamorous'
import * as b from 'react-bootstrap'
import Disabler from './Disabler'
import ImageProgressBar from './ImageProgressBar'

@observer
export default class Unit extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    unit: MPropTypes.observableObject.isRequired,
    trainingAvailable: PropTypes.bool,
    onTrain: PropTypes.func
  }

  render () {
    const { unit } = this.props
    const tooltip = <b.Tooltip id={unit.name + 'tooltip'}>
      <g.B>{unit.name}</g.B>
      <br />
      <g.B>Cost:</g.B>
      {unit.costStr}<br />
      {unit.description}
    </b.Tooltip>
    return (
      <Disabler enabled={this.props.trainingAvailable}>
        <b.OverlayTrigger placement='right' overlay={tooltip}>
          <ImageProgressBar
            {...css({ width: '70px', height: '70px' })}
            onClick={() => this.props.trainingAvailable && this.props.onTrain && this.props.onTrain()}
            imgSrc={unit.imgSrc}
            progress={unit.queueProgress}>
            {
              unit.queueLength
                ? <g.Span
                  padding='2px'
                  margin='2px'
                  borderRadius='7px'
                  fontSize='20px'
                  color='white'
                  backgroundColor='rgba(10,10,10,0.5)'>
                  {unit.queueLength}
                </g.Span>
                : null
            }
          </ImageProgressBar>
        </b.OverlayTrigger>
      </Disabler>
    )
  }
}
