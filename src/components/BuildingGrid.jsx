import React, { Component } from 'react'
import { css } from 'glamor'
import { observer, PropTypes } from 'mobx-react'
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
    buildings: PropTypes.arrayOrObservableArray.isRequired
  }

  render () {
    return (
      <div {...rowMargin}>
        <ElementDivider columns={4}>
          {this.props.buildings.map((building, i) =>
            <Building
              key={i}
              name={building.name}
              level={building.level}
              imgSrc={building.imgSrc} />
          )}
        </ElementDivider>
      </div>
    )
  }
}
