import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as b from 'react-bootstrap'
import Disabler from './Disabler'
import ImageProgressBar from './ImageProgressBar'

export default class Building extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    name: PropTypes.string.isRequired,
    upgradeAvailable: PropTypes.bool,
    level: PropTypes.number,
    upgradeProgress: PropTypes.number,
    imgSrc: PropTypes.string,
    onUpgradeClick: PropTypes.func
  }

  render () {
    const isBuildingActive = this.props.upgradeAvailable || !!this.props.level

    return (
      <Disabler enabled={isBuildingActive}>
        <ImageProgressBar imgSrc={this.props.imgSrc} progress={this.props.upgradeProgress}>
          <div className='text-center'>
            {this.props.name}
          </div>
          <b.Row>
            <b.Col xs={6} className='text-center'>
              <Disabler enabled={this.props.upgradeAvailable}>
                <img
                  src='/static/plus.svg'
                  width={25}
                  onClick={this.props.upgradeAvailable ? this.props.onUpgradeClick : null}
                />
              </Disabler>
            </b.Col>
            <b.Col xs={6} className='text-center'>
              {this.props.level || 0}
            </b.Col>
          </b.Row>
        </ImageProgressBar>
      </Disabler>
    )
  }
}
