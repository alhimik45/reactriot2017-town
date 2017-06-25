import React, { Component } from 'react'
import { css } from 'glamor'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import ElementDivider from './ElementDivider'
import Unit from './Unit'

const rowMargin = css({
  '& .row': {
    marginBottom: '7px'
  }
})

@observer
export default class UnitGrid extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    canBuy: PropTypes.func.isRequired,
    onTrain: PropTypes.func.isRequired,
    units: PropTypes.array.isRequired
  }

  render () {
    return (
      <div {...rowMargin}>
        <ElementDivider columns={4}>
          {this.props.units.map((unit, i) =>
            <Unit
              key={i}
              unit={unit}
              trainingAvailable={this.props.canBuy(unit)}
              onTrain={() => this.props.onTrain(unit)} />
          )}
        </ElementDivider>
      </div>
    )
  }
}
