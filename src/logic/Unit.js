import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash/fp'
import { observable, computed, action } from 'mobx'
import Resource from './Resource'

export default class Unit {
  static types = L({
    IDLE: { profession: 'none' },

    MINER: {
      profession: 'worker',
      cost: [
        [Resource.types.WOOD.id, 10],
        [Resource.types.MONEY.id, 3]
      ],
      resourceEffect: [[Resource.types.GEMS.id, 5]]
    },
    LUMBERJACK: {
      profession: 'worker',
      cost: [[Resource.types.MONEY.id, 4]],
      resourceEffect: [[Resource.types.WOOD.id, 5]]
    },
    FARMER: {
      profession: 'worker',
      cost: [[Resource.types.WOOD.id, 7]],
      resourceEffect: [[Resource.types.FOOD.id, 5]]
    },
    HUNTER: {
      profession: 'worker',
      cost: [
        [Resource.types.WOOD.id, 10],
        [Resource.types.MONEY.id, 10]
      ],
      resourceEffect: [[Resource.types.FOOD.id, 10]]
    },

    RECRUIT: {
      profession: 'soldier',
      power: 1,
      cost: [
        [Resource.types.FOOD.id, 5]
      ]
    },
    SERGEANT: {
      profession: 'soldier',
      power: 3,
      cost: [
        [Resource.types.FOOD.id, 10],
        [Resource.types.MONEY.id, 10]
      ]
    },
    OFFICER: {
      profession: 'soldier',
      power: 5,
      cost: [
        [Resource.types.FOOD.id, 15],
        [Resource.types.MONEY.id, 15]
      ]
    },
    GENERAL: {
      profession: 'soldier',
      power: 30,
      cost: [
        [Resource.types.FOOD.id, 20],
        [Resource.types.MONEY.id, 20]
      ]
    },

    RIOTER: {
      profession: 'none',
      resourceEffect: [
        [Resource.types.FOOD.id, -5],
        [Resource.types.WOOD.id, -5],
        [Resource.types.GEMS.id, -5]
      ]
    },
    CRIMINAL: {
      profession: 'none',
      resourceEffect: [
        [Resource.types.FOOD.id, -1, () => { return _.random(-1, 0) }],
        [Resource.types.WOOD.id, -1, () => { return _.random(-1, 0) }],
        [Resource.types.GEMS.id, -1, () => { return _.random(-1, 0) }]
      ]
    },
    PRISONER: {
      profession: 'none',
      resourceEffect: [
        [Resource.types.FOOD.id, 2, () => { return _.random(0, 2) }],
        [Resource.types.WOOD.id, 2, () => { return _.random(0, 2) }],
        [Resource.types.GEMS.id, 2, () => { return _.random(0, 2) }]
      ]
    }
  }).map((val, key) => {
    val.id = key
    return [key, val]
  }).toObject()

  static trainingTicks = 10

  @persist('object') @observable type
  @persist @observable amount
  @persist @observable queueLength = 0
  @persist @observable currentQueueUnitTicks = Unit.trainingTicks

  constructor (type, amount) {
    this.type = type
    this.amount = amount
  }

  @computed get name () {
    return _.capitalize(this.type.id)
  }

  @computed get costStr () {
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

  @computed get cost () {
    if (!this.type.cost) {
      return {}
    }
    return L(this.type.cost.slice()).toObject()
  }

  @computed get resourcesDiff () {
    if (!this.type.resourceEffect) {
      return []
    }
    return L(this.type.resourceEffect.slice()).map(([key, val, lam]) => {
      let res = [key, val * this.amount]
      if (_.isFunction(lam)) {
        res.push(lam() * this.amount)
      }
      return res
    }).toArray()
  }

  @computed get queueProgress () {
    return 100 - Math.round(this.currentQueueUnitTicks / Unit.trainingTicks * 100)
  }

  addToQueue (count) {
    this.queueLength += count
    if (this.queueLength === count) {
      this.currentQueueUnitTicks = Unit.trainingTicks
    }
  }

  @action
  stepTraining () {
    if (this.queueLength > 0) {
      this.currentQueueUnitTicks -= 1
      if (this.currentQueueUnitTicks === 0) {
        this.amount += 1
        this.queueLength -= 1
        this.currentQueueUnitTicks = Unit.trainingTicks
      }
    }
  }
}
