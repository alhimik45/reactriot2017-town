import React, { Component } from 'react'
import * as b from 'react-bootstrap'
import PropTypes from 'prop-types'
import L from 'lazy.js'

export default class ElementDivider extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    columns: PropTypes.number
  }

  render () {
    const columns = this.props.columns || 2
    return (
      <div>
        {L(this.props.children).chunk(columns).map((chunk, i) =>
          <b.Row key={i}>
            {chunk.map((element, j) =>
              <b.Col key={j} xs={12 / columns}>{element}</b.Col>
            )}
          </b.Row>
        ).toArray()}
      </div>
    )
  }
}
