import React, { Component } from 'react'
import * as b from 'react-bootstrap'
import { observer, PropTypes } from 'mobx-react'
import { observable, action } from 'mobx'
import Slider from 'react-rangeslider'

@observer
export default class ModalWar extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    appState: PropTypes.observableObject.isRequired
  }

  @observable visible = false
  @observable value = 0

  @action
  open () {
    this.max = this.value = this.props.appState.populationState.soldiersPower.amount
    if (this.value === 0) {
      this.props.appState.msg.show(`You haven't war power to fight`)
      return
    }
    this.oldTicks = this.props.appState.tickPerSecond
    this.props.appState.tickPerSecond = 0
    this.visible = true
  }

  @action
  close () {
    this.props.appState.tickPerSecond = this.oldTicks
    this.visible = false
  }

  render () {
    return (
      <div>
        <b.Button
          bsStyle='danger'
          onClick={() => this.open()}>
          Attack enemies
        </b.Button>
        <b.Modal show={this.visible} onHide={() => this.close()}>
          <b.Modal.Header closeButton>
            <b.Modal.Title>War</b.Modal.Title>
          </b.Modal.Header>
          <b.Modal.Body>
            <h4 className='text-center'>
              Select Power you want to send at war
            </h4>

            <Slider
              value={this.value}
              orientation='horizontal'
              tooltip={false}
              onChange={action(n => { this.value = n })}
              min={0}
              max={this.props.appState.populationState.soldiersPower.amount}
              labels={{ 0: 0, 100: this.props.appState.populationState.soldiersPower.amount }}
            />
            <div className='text-center'>
              {this.value}
            </div>
            <b.Button
              bsStyle='danger'
              onClick={() => {
                this.props.appState.attack(this.value)
                this.close()
              }}>
              Attack!
            </b.Button>
          </b.Modal.Body>
          <b.Modal.Footer>
            <b.Button onClick={() => this.close()}>Close</b.Button>
          </b.Modal.Footer>
        </b.Modal>
      </div>
    )
  }
}
