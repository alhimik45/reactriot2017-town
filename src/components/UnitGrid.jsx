import React, { Component } from 'react'
import { css } from 'glamor'
import { observer, PropTypes } from 'mobx-react'
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
    units: PropTypes.arrayOrObservableArray.isRequired
  }

  render () {
    return (
      <div {...rowMargin}>
        <ElementDivider columns={4}>
          {this.props.units.map((unit, i) =>
            <Unit
              key={i}
              name={unit.name}
              cost={unit.cost}
              description={unit.description}
              imgSrc={unit.imgSrc} />
          )}
        </ElementDivider>
      </div>
    )
  }
}
