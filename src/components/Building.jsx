import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import * as g from 'glamorous'
import {css} from 'glamor'
import { observer, PropTypes as MPropTypes } from 'mobx-react'
import Disabler from './Disabler'
import ImageProgressBar from './ImageProgressBar'
import { paddingSides5 } from './../styles'

@observer
export default class Building extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    building: MPropTypes.objectOrObservableObject.isRequired,
    upgradeAvailable: PropTypes.bool,
    onUpgrade: PropTypes.func
  }

  render () {
    const { building } = this.props
    const isBuildingActive = this.props.upgradeAvailable || !!building.level

    const tooltip = <b.Tooltip id={building.name + 'tooltip'}>
      <g.B>{building.name}</g.B>
      <br />
      <g.B>Cost:</g.B>
      {building.costStr}<br />
      {building.description}
    </b.Tooltip>

    return (
      <Disabler enabled={isBuildingActive}>
        <b.OverlayTrigger placement='top' overlay={tooltip}>
          <ImageProgressBar
            {...css({height: '70px'})}
            imgSrc={building.imgSrc}
            progress={building.upgradeProgress}>
            <b.Row>
              <b.Col
                {...paddingSides5}
                xs={5}
                className='text-center'>
                <Disabler enabled={this.props.upgradeAvailable}>
                  <img
                    src='/static/plus.svg'
                    width={25}
                    onClick={this.props.upgradeAvailable && this.props.onUpgrade}
                  />
                </Disabler>
              </b.Col>
              <b.Col
                {...paddingSides5}
                xs={2}>
                {
                  building.queueLength
                    ? <g.Span
                      padding='1px'
                      margin='1px'
                      borderRadius='7px'
                      fontSize='15px'
                      color='white'
                      backgroundColor='rgba(10,10,10,0.5)'>
                      {building.queueLength}
                    </g.Span>
                    : null
                }
              </b.Col>
              <b.Col
                {...paddingSides5}
                xs={5}
                className='text-center'>
                <g.Span
                  color='white'
                  borderRadius='1px'
                  paddingLeft='2px'
                  paddingRight='2px'
                  fontSize='18px'
                  backgroundColor='rgba(10,10,10,0.5)'>
                  {building.amount || 0}
                </g.Span>
              </b.Col>
            </b.Row>
          </ImageProgressBar>
        </b.OverlayTrigger>
      </Disabler>
    )
  }
}
