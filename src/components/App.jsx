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

const BigP = g.p({
  fontSize: '24px'
})

@observer
export default class App extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    appState: PropTypes.observableObject.isRequired
  }

  getProfessionsOneByOne () {
    return L(this.props.appState.populationState.workers).zip(this.props.appState.populationState.soldiers).flatten().without(undefined).concat([this.props.appState.populationState.soldiersPower]).toArray()
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
                units={this.props.appState.populationState.soldiers.concat(this.props.appState.populationState.workers)} />
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
              STATISTICS
            </BigP>
            <b.Col xs={12}>
              <b.Col xs={6}>
                <ElementDivider>
                  <StatsRow name={this.props.appState.populationState.growth.name}
                    imgSrc={this.props.appState.populationState.growth.imgSrc}
                    amount={`${this.props.appState.populationState.growth.amount}`} />
                  <StatsRow name={this.props.appState.populationState.mortality.name}
                    imgSrc={this.props.appState.populationState.mortality.imgSrc}
                    amount={`${this.props.appState.populationState.mortality.amount}`} />
                  <StatsRow name={this.props.appState.populationState.displeasure.name}
                    imgSrc={this.props.appState.populationState.displeasure.imgSrc}
                    amount={`${this.props.appState.populationState.displeasure.amount}`} />
                  <StatsRow name='Total' imgSrc='/static/total.svg'
                    amount={`${this.props.appState.populationState.totalPopulationAmount}`} />
                </ElementDivider>
              </b.Col>
              <b.Col xs={6}>
                resources speeds here
              </b.Col>
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <BigP>
                Buildings
              </BigP>
              {/* <BuildingGrid buildings={this.props.appState.buildingState.buildings} /> */}
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
                {this.props.appState.resourcesState.resources.map((e, i) =>
                  <StatsRow
                    key={i}
                    name={e.name}
                    imgSrc={e.imgSrc}
                    amount={`${e.amount}`} />
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
                {this.props.appState.populationState.population.map((e, i) =>
                  <StatsRow
                    key={i}
                    name={e.name}
                    imgSrc={e.imgSrc}
                    amount={`${e.amount}`} />
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
                    name={e.name}
                    imgSrc={e.imgSrc}
                    amount={`${e.amount}`} />
                )}
              </ElementDivider>
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <Taxes value={50} onChange={null} />
            </b.Col>
          </b.Row>
          <b.Row>
            <b.Col xs={12}>
              <BigP>
                Speed
              </BigP>
              <Multiplier
                elements={[1, 2, 3]}
                current={0}
                nameFormatter={n => n + 'x'} />
            </b.Col>
          </b.Row>
        </b.Col>
        <DevTools />
      </b.Row>
    )
  }
}
