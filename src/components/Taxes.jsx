import React, { Component } from 'react'
import Slider from 'react-rangeslider'
import PropTypes from 'prop-types'
import g from 'glamorous'
import 'react-rangeslider/lib/index.css'

export default class Taxes extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
  }

  constructor (props, context) {
    super(props, context)
    this.state = {
      value: this.props.value || 20
    }
  }

  handleChange = (value) => {
    this.setState({
      value: value
    })
  }

  render () {
    return (
      <div>
        <g.P fontSize='24px'>
          Taxes
        </g.P>
        <Slider
          value={this.state.value}
          orientation='horizontal'
          tooltip={false}
          onChange={this.handleChange}
          onChangeComplete={() => this.props.onChange(this.state.value)}
          min={0}
          max={100}
          labels={{0: '0%', 100: '100%'}}
        />
        <div className='text-center'>
          {this.state.value}%
        </div>
      </div>
    )
  }
}
