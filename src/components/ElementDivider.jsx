import React, { Component } from 'react'
import * as b from 'react-bootstrap'
import L from 'lazy.js'

export default class ElementDivider extends Component {
  render () {
    return (
      <div>
        {L(this.props.children).chunk(2).map((chunk, i) =>
          <b.Row key={i}>
            {chunk.map((element, j) =>
              <b.Col key={j} xs={6}>{element}</b.Col>
            )}
          </b.Row>
        ).toArray()}
      </div>
    )
  }
}
