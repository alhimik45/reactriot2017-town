import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash/fp'
import { observable, computed } from 'mobx'
import Resource from './Resource'

export default class Building {
  static types = L({
    Bank: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank1: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank2: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank3: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank4: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank5: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank6: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank7: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank8: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    },
    Bank9: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      resourceEffect: [[Resource.types.MONEY.id, 5]]
    }
  }).map((val, key) => {
    val.id = key
    return [key, val]
  }).toObject()

  @persist @observable type
  @persist @observable amount

  @computed get name () {
    return _.capitalize(this.type.id)
  }

  @computed get cost () {
    return this.type.cost
      .map(([resource, amount]) => `${amount} ${_.capitalize(resource)}`)
      .join(', ')
  }

  @computed get imgSrc () {
    return `/static/${this.type.id.toLowerCase()}.svg`
  }

  constructor (type, amount) {
    this.type = type
    this.amount = amount
  }
}
