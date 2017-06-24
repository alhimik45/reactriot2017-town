import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import PropTypes from 'prop-types'
import g from 'glamorous'
import 'react-rangeslider/lib/index.css'

export default class Taxes extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    value: PropTypes.number,
    handleOnChangeComplete: PropTypes.func
  }

  render () {
    return (
      <g.Div>
        <g.P fontSize='24px'>
          Taxes
        </g.P>
        <Slider
          value={this.props.value}
          orientation='horizontal'
          onChangeComplete={this.props.handleOnChange}
          min={0}
          max={100}
          labels={{0: '0%', 100: '100%'}}
        />
      </g.Div>
    )
  }
}
