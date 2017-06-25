import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash/fp'
import { observable, computed, action } from 'mobx'
import Resource from './Resource'

export default class Building {
  static types = L({
    HOUSE: {
      cost: [
        [Resource.types.WOOD.id, 25]
      ],
      onBuilt: appState => appState.populationState.addIdle(10),
      description: 'Adds 10 idle people'
    },
    SKYSCRAPPER: {
      cost: [
        [Resource.types.WOOD.id, 2500],
        [Resource.types.MONEY.id, 1000],
        [Resource.types.GEMS.id, 100]
      ],
      onBuilt: appState => appState.populationState.addIdle(1000),
      description: 'Adds 1000 idle people'
    }
  }).map((val, key) => {
    val.id = key
    return [key, val]
  }).toObject()

  static trainingTicks = 10

  @persist @observable type
  @persist @observable amount
  @persist @observable queueLength = 0
  @persist @observable buildingTicks = Building.trainingTicks

  @computed get name () {
    return _.capitalize(this.type.id)
  }

  @computed get costStr () {
    return this.type.cost
      .map(([resource, amount]) => `${amount} ${_.capitalize(resource)}`)
      .join(', ')
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

  get description () {
    return this.type.description
  }

  constructor (type, amount) {
    this.type = type
    this.amount = amount
  }

  @computed get upgradeProgress () {
    return 100 - Math.round(this.buildingTicks / Building.trainingTicks * 100)
  }

  @action
  build () {
    this.queueLength += 1
    if (this.queueLength === 1) {
      this.buildingTicks = Building.trainingTicks
    }
  }

  @action
  stepBuilding (appState) {
    if (this.queueLength > 0) {
      this.buildingTicks -= 1
      if (this.buildingTicks === 0) {
        this.amount += 1
        this.type.onBuilt(appState)
        this.queueLength -= 1
        this.buildingTicks = Building.trainingTicks
      }
    }
  }
}
