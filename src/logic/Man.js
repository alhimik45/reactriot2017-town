import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash/fp'
import { observable, computed } from 'mobx'
import Resource from './Resource'

export default class Man {
  static types = L({
    UNEMPLOYED: { profession: 'none' },

    MINER: {
      profession: 'worker',
      cost: [
        [Resource.types.FOOD.id, 10],
        [Resource.types.WOOD.id, 6]
      ],
      resourceEffect: [[Resource.types.GEMS.id, 5]]
    },
    LUMBERJACK: {
      profession: 'worker',
      cost: [[Resource.types.FOOD.id, 10]],
      resourceEffect: [[Resource.types.WOOD.id, 5]]
    },
    FARMER: {
      profession: 'worker',
      cost: [[Resource.types.FOOD.id, 10]],
      resourceEffect: [[Resource.types.FOOD.id, 5]]
    },
    HUNTER: {
      profession: 'worker',
      cost: [[Resource.types.FOOD.id, 10]],
      resourceEffect: [[Resource.types.FOOD.id, 10]]
    },
    BUILDER: {
      profession: 'worker',
      cost: [[Resource.types.FOOD.id, 10]],
      description: 'Increases construction speed. The more buildings the more builders you need'
    },

    RECRUIT: {
      profession: 'soldier',
      power: 1,
      cost: [[Resource.types.FOOD.id, 10]]
    },
    SERGEANT: {
      profession: 'soldier',
      power: 3,
      cost: [[Resource.types.FOOD.id, 10]]
    },
    OFFICER: {
      profession: 'soldier',
      power: 5,
      cost: [[Resource.types.FOOD.id, 10]]
    },
    GENERAL: {
      profession: 'soldier',
      power: 0,
      cost: [[Resource.types.FOOD.id, 10]],
      description: 'General significantly increases power of army, but too many generals can lead to unrest and RIOT'
    },

    RIOTER: {
      profession: 'none',
      resourceEffect: [
        [Resource.types.FOOD.id, () => _.random(-12, 3)],
        [Resource.types.WOOD.id, () => _.random(-12, 3)],
        [Resource.types.GEMS.id, () => _.random(-12, 3)]
      ]
    },
    CRIMINAL: {
      profession: 'none',
      resourceEffect: [
        [Resource.types.FOOD.id, () => _.random(-3, 1)],
        [Resource.types.WOOD.id, () => _.random(-3, 1)],
        [Resource.types.GEMS.id, () => _.random(-3, 1)]
      ]
    },
    PRISONER: {
      profession: 'none',
      resourceEffect: [
        [Resource.types.FOOD.id, () => _.random(-1, 6)],
        [Resource.types.WOOD.id, () => _.random(-1, 6)],
        [Resource.types.GEMS.id, () => _.random(-1, 6)]
      ]
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

  @computed get description () {
    if (this.type.description) {
      return this.type.description
    }
    if (this.type.profession === 'worker') {
      return 'Produces ' +
        this.type.resourceEffect
          .map(([resource, amount]) => `${amount} ${_.capitalize(resource)}`)
          .join(', ') +
        ' per second'
    }
    if (this.type.profession === 'soldier') {
      return `Power: ${this.type.power}`
    }
    return ''
  }

  @computed get imgSrc () {
    return `/static/${this.type.id.toLowerCase()}.svg`
  }

  constructor (type, amount) {
    this.type = type
    this.amount = amount
  }
}
