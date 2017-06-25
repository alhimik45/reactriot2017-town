import React, { Component } from 'react'
import { css } from 'glamor'
import PropTypes from 'prop-types'
import { observer, PropTypes as MPropTypes } from 'mobx-react'
import ElementDivider from './ElementDivider'
import Building from './Building'

const rowMargin = css({
  '& .row': {
    marginBottom: '7px'
  }
})

@observer
export default class BuildingGrid extends Component {
  // noinspection JSUnusedGlobalSymbols,JSUnresolvedVariable
  static propTypes = {
    buildings: MPropTypes.arrayOrObservableArray.isRequired,
    canUpgrade: PropTypes.func.isRequired,
    onUpgrade: PropTypes.func.isRequired
  }

  render () {
    return (
      <div {...rowMargin}>
        <ElementDivider columns={4}>
          {this.props.buildings.map((building, i) =>
            <Building
              key={i}
              building={building}
              upgradeAvailable={this.props.canUpgrade(building)}
              onUpgrade={() => this.props.onUpgrade(building)} />
          )}
        </ElementDivider>
      </div>
    )
  }
}
