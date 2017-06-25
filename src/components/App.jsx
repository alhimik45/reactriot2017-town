import React, { Component } from 'react'
import { observer, PropTypes } from 'mobx-react'
import { margin5, noTextSelect } from './../styles'
import * as b from 'react-bootstrap'
import g from 'glamorous'
import { css } from 'glamor'
import L from 'lazy.js'
import Multiplier from './Multiplier'
import Taxes from './Taxes'
import ElementDivider from './ElementDivider'
import StatsRow from './StatsRow'
import UnitGrid from './UnitGrid'
import DevTools from 'mobx-react-devtools'
import BuildingGrid from './BuildingGrid'
import AlertContainer from 'react-alert'

const BigP = g.p({
  fontSize: '24px'
})

@observer
export default class App extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    appState: PropTypes.observableObject.isRequired
  }

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 5000,
    transition: 'scale'
  }

  getProfessionsOneByOne () {
    return L(this.props.appState.populationState.workers)
      .zip(this.props.appState.populationState.soldiers)
      .flatten()
      .concat([
        { name: '', amount: '' },
        this.props.appState.populationState.soldiersPower
      ])
      .toArray()
  }

  render () {
    const { appState } = this.props
    return (
      <b.Row {...css(noTextSelect, margin5)} className='text-center'>
        <b.Col xs={3}>
          <b.Row>
            <b.Col xs={12}>
              <BigP>
                Training
              </BigP>
              <Multiplier
                elements={[1, 10, 100]}
                current={appState.trainingMultiplier}
                nameFormatter={n => 'x' + n}
                onChange={n => appState.setTrainingMultiplier(n)} />
            </b.Col>
          </b.Row>
          <b.Row>
            <BigP>
              Units
            </BigP>
            <b.Col xs={12}>
              <UnitGrid
                canBuy={u => appState.canBuy(u)}
                onTrain={u => appState.buyUnit(u)}
                units={appState.populationState.soldiers.concat(appState.populationState.workers)} />
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <g.P fontSize='24px'>
                War
              </g.P>
            </b.Col>
          </b.Row>
        </b.Col>
        <b.Col xs={6}>
          <b.Row>
            <BigP>
              Resource production rate
            </BigP>
            <b.Col xs={12}>
              <ElementDivider>
                {L(appState.resourcesSpeed).map((stats, i) =>
                  <StatsRow
                    key={i}
                    stats={stats} />
                ).toArray()}
              </ElementDivider>
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <BigP>
                Buildings
              </BigP>
              <BuildingGrid
                canUpgrade={b => appState.canUpgrade(b)}
                onUpgrade={b => appState.buyBuilding(b)}
                buildings={appState.buildingState.buildings}
              />
            </b.Col>
          </b.Row>
        </b.Col>
        <b.Col xs={3}>
          <b.Row>
            <b.Col xs={12}>
              <BigP>
                Resources
              </BigP>
              <ElementDivider>
                {appState.resourcesState.resources.map((e, i) =>
                  <StatsRow
                    key={i}
                    stats={e} />
                )}
              </ElementDivider>
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <BigP>
                Population
              </BigP>
              <ElementDivider>
                {appState.populationState.population.map((e, i) =>
                  <StatsRow
                    key={i}
                    stats={e} />
                )}
              </ElementDivider>
              <br />
              <g.Div>
                <g.P fontSize='18px' width='50%' float='left'>
                  Workers
                </g.P>
                <g.P fontSize='18px' width='50%' float='left'>
                  Soldiers
                </g.P>
              </g.Div>
              <ElementDivider>
                {this.getProfessionsOneByOne().map((e, i) =>
                  <StatsRow
                    key={i}
                    stats={e} />
                )}
              </ElementDivider>
            </b.Col>
          </b.Row>
          <b.Row>
            <BigP>
              Info
            </BigP>
            <b.Col xs={12}>
              <ElementDivider>
                <StatsRow stats={appState.populationState.mortality} />
                <StatsRow stats={appState.populationState.displeasure} />
                <StatsRow stats={appState.populationState.populationStat} />
              </ElementDivider>
            </b.Col>
          </b.Row>
          <b.Row />
          <b.Row>
            <b.Col xs={12}>
              <BigP>
                Speed
              </BigP>
              <Multiplier
                elements={[1, 2, 3]}
                current={appState.tickPerSecond}
                nameFormatter={n => n + 'x'}
                onChange={n => appState.setSpeed(n)} />
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <Taxes value={appState.populationState.tax} onChange={(n) => appState.setTax(n)} />
            </b.Col>
          </b.Row>
        </b.Col>
        <DevTools />
        <AlertContainer ref={a => { appState.msg = a }} {...this.alertOptions} />
      </b.Row>
    )
  }
}
