import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

export default class Disabler extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    enabled: PropTypes.bool
  }

  render () {
    const visibility = css({
      opacity: this.props.enabled ? 1 : 0.5
    })

    return (
      <div {...visibility}>
        {this.props.children}
      </div>
    )
  }
}
