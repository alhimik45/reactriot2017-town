import React, { Component } from 'react'
import * as b from 'react-bootstrap'

export default class ModalHelp extends Component {
  constructor (props, context) {
    super(props, context)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.state = {
      showModal: false
    }
  }

  close () {
    this.setState({ showModal: false })
  }

  open () {
    this.setState({ showModal: true })
  }

  render () {
    return (
      <div>
        <b.Button
          bsStyle='info'
          onClick={this.open}
        >
          <b.Glyphicon glyph='question-sign' />
        </b.Button>
        <b.Modal show={this.state.showModal} onHide={this.close}>
          <b.Modal.Header closeButton>
            <b.Modal.Title>Help</b.Modal.Title>
          </b.Modal.Header>
          <b.Modal.Body>
            <h4>Text for help with components.</h4>
          </b.Modal.Body>
          <b.Modal.Footer>
            <b.Button onClick={this.close}>Close</b.Button>
          </b.Modal.Footer>
        </b.Modal>
      </div>
    )
  }
}
