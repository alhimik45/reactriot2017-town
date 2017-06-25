import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash/fp'
import { observable, computed, action } from 'mobx'
import Resource from './Resource'

export default class Building {
  static types = L({
    HOUSE: {
      cost: [
        [Resource.types.MONEY.id, 10],
        [Resource.types.WOOD.id, 100]
      ],
      onBuilt: appState => appState.populationState.addIdle(10),
      description: 'Adds 10 idle people'
    },
    SKYSCRAPPER: {
      cost: [
        [Resource.types.WOOD.id, 4000],
        [Resource.types.MONEY.id, 1000],
        [Resource.types.GEMS.id, 1000],
        [Resource.types.ELEC.id, 50]
      ],
      onBuilt: appState => appState.populationState.addIdle(1000),
      description: 'Adds 1000 idle people'
    },
    BANK: {
      cost: [
        [Resource.types.WOOD.id, 400],
        [Resource.types.GEMS.id, 500],
        [Resource.types.ELEC.id, 50]
      ],
      onBuilt: appState => {
        appState.populationState.criminalCoef += 0.005
        appState.populationState.displeasureChange(0.1)
        appState.resourcesState.resourcesMap.get('MONEY').amount +=
          Math.round(appState.resourcesState.resourcesMap.get('MONEY').amount * 0.5)
      },
      description: 'Instantly increases money in 40%, but increases Anger and Criminals'
    },
    SHOP: {
      cost: [
        [Resource.types.MONEY.id, 70],
        [Resource.types.ELEC.id, 30],
        [Resource.types.GEMS.id, 300]
      ],
      onBuilt: appState => {
        appState.populationState.criminalCoef += 0.001
        appState.populationState.displeasureChange(-0.005)
      },
      description: 'Decreases Anger'
    },
    ELECTROSTATION: {
      cost: [
        [Resource.types.WOOD.id, 300],
        [Resource.types.MONEY.id, 70],
        [Resource.types.GEMS.id, 300]
      ],
      onBuilt: appState => {
        appState.populationState.mortalityCoef += 0.002
        appState.resourcesState.resourcesMap.get('ELEC').amount += 150
        appState.populationState.displeasureChange(0.001)
      },
      description: 'Gives Electricity, sligntly increases Anger and Mortality'
    },
    PUB: {
      cost: [
        [Resource.types.ELEC.id, 25],
        [Resource.types.MONEY.id, 100]
      ],
      onBuilt: appState => {
        appState.populationState.criminalCoef += 0.001
        appState.populationState.displeasureChange(-0.02)
      },
      description: 'Seriously decreases Anger, but increases Criminals'
    },
    REACTOR: {
      cost: [
        [Resource.types.GEMS.id, 650],
        [Resource.types.MONEY.id, 200]
      ],
      onBuilt: appState => {
        appState.resourcesState.resourcesMap.get('ELEC').amount += 500
        appState.populationState.displeasureChange(-0.05)
      },
      description: 'Gives many Electricity and decreases chance of RIOT ;)'
    },
    HOSPITAL: {
      cost: [
        [Resource.types.GEMS.id, 300],
        [Resource.types.ELEC.id, 150],
        [Resource.types.MONEY.id, 70]
      ],
      onBuilt: appState => {
        appState.populationState.mortalityCoef = Math.max(appState.populationState.mortalityCoef - 0.005, 0)
      },
      description: 'Descreases mortality'
    },
    POLICE: {
      cost: [
        [Resource.types.GEMS.id, 300],
        [Resource.types.ELEC.id, 50],
        [Resource.types.MONEY.id, 70]
      ],
      onBuilt: appState => {
        let crimC = Math.round(appState.populationState.unitsMap.get('CRIMINAL').amount * 0.9)
        let riotC = Math.round(appState.populationState.unitsMap.get('RIOTER').amount * 0.8)
        let count = crimC + riotC
        let soldiersC = Math.round(count * 0.7)
        if (appState.populationState.soldiersCount < soldiersC) {
          soldiersC = Math.round(appState.populationState.soldiersCount * 0.9)
          crimC = Math.round(soldiersC / 2 * 0.9)
          riotC = Math.round(soldiersC / 2 * 0.8)
          count = crimC + riotC
        }
        appState.populationState.killSoldiers(soldiersC)
        appState.populationState.unitsMap.get('CRIMINAL').amount -= crimC
        appState.populationState.unitsMap.get('RIOTER').amount -= riotC
        appState.populationState.unitsMap.get('PRISONER').amount += Math.round(count * 0.95)
        appState.populationState.mortalityCoef = Math.max(appState.populationState.mortalityCoef + 0.001, 0)
      },
      description: 'Converts soldiers into policemans, that catch criminals and rioters and put them into prison'
    }
  }).map((val, key) => {
    val.id = key
    return [key, val]
  }).toObject()

  static trainingTicks = 10

  @persist('object') @observable type
  @persist @observable amount
  @persist @observable queueLength = 0
  @persist @observable buildingTicks = Building.trainingTicks

  @computed get name () {
    if (this.type.id === 'REACTOR') {
      return 'REACTor'
    }
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
        Building.types[this.type.id].onBuilt(appState)
        this.queueLength -= 1
        this.buildingTicks = Building.trainingTicks
      }
    }
  }
}
