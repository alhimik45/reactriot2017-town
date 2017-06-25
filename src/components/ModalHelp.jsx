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
          <b.Glyphicon glyph='question-sign' /> HOW TO PLAY
        </b.Button>
        <b.Modal show={this.state.showModal} onHide={this.close}>
          <b.Modal.Header closeButton>
            <b.Modal.Title>Help</b.Modal.Title>
          </b.Modal.Header>
          <b.Modal.Body>
            <h4>Hello.</h4>
            <p>You are manager of a small strange and unstable town.</p>
            <p>Your people can be a miners, lumberjacks, farmers and hunters. Each of them can give you resources. You can see the list of resources on the top right corner. In the top of screen you can see the rate of resources extraction</p>
            <p>It will take some resources to train idle man. Hover on unit to learn how much.</p>
            <p>You can build some buildings. Buildings give your some effects. You can read about them by hover on building.</p>
            <p>Sometimes your people can go criminal for stealing your resources. Criminals can become an idle people back. Your city statistics (population and professions) displayed on the right part of screen</p>
            <p>You can control taxes from, your people (slider on right bottom side), it will give your more money per tick, but increase anger of population.</p>
            <p>Anger affects on chance, that worker or idle people can become criminals</p>
            <p>When anger is very big, you people can start RIOT. Rioters will quickly destroy your resources!</p>
            <p>You have some mortality level (panel "Info" on left side). For example, your people will die faster without food (obviously)</p>
            <p>You can build ARMY for some aggressive actions against neighbors. Just recruit them and press "Attack enemies" button. In the war you can take away some resources from enemies...or you can lose all your soldiers. Remember, that army will spend a money (the bigger army, the more money)</p>
            <p>You will recieve some notifications (alerts) on the left bottom side of screen. (For example you can recieve a RIOT alert.)</p>
            <p>Sometimes a strange things will happen with your city. Results of them you can recieved by notification (previous paragraph about them:) )</p>
            <h4>Controls</h4>
            <p>You can control the speed of game by buttons (left panel under "Info). It has a 0 value by default. (x1 to start the game)</p>
            <p>You can queue up several units at once. (1, 10 or 100). It controls by buttons on "Trainings" block. (left top side) </p>
            <p>Buildings and units creates by just click. (queue for the creation, like in strategies :) )</p>
          </b.Modal.Body>
          <b.Modal.Footer>
            <b.Button onClick={this.close}>Close</b.Button>
          </b.Modal.Footer>
        </b.Modal>
      </div>
    )
  }
}
