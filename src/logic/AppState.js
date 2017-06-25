import { action, computed, createTransformer, observable } from 'mobx'
import { create, persist } from 'mobx-persist'
import ResourceState from './ResourceState'
import PopulationState from './PopulationState'
import BuildingState from './BuildingState'
import L from 'lazy.js'
import _ from 'lodash'
import Resource from './Resource'

export default class AppState {
  @persist('object', ResourceState)
  @observable
  resourcesState = new ResourceState()

  @persist('object', PopulationState)
  @observable
  populationState = new PopulationState(this)

  @persist('object', BuildingState)
  @observable
  buildingState = new BuildingState()

  @persist @observable tickPerSecond = 0
  @persist @observable trainingMultiplier = 1

  constructor () {
    this.hydrate = create({ storage: window.localStorage })
    this.sync()
    this.populationState.units[3].amount += 25
    this.populationState.units[0].amount += 25
    // this.doTick()
    this.runResourceTicks()
    this.runTrainingTicks()
  }

  sync () {
    // this.hydrate('save', this)
  }

  runResourceTicks () {
    setTimeout(() => {
      if (this.tickPerSecond !== 0) {
        this.doResourceTick()
      }
      this.runResourceTicks()
    }, this.tickTime)
  }

  @action
  doResourceTick () {
    this.resourcesState.applyDiff(this.populationState.resourcesPerSecond(1))
    if (this.resourcesState.resourcesMap.get(Resource.types.FOOD.id).amount === 0) {
      this.populationState.mortalityFoodSet(10)
    } else {
      this.populationState.mortalityFoodSet(1)
    }
    this.populationState.applyMortality()
  }

  runTrainingTicks () {
    setTimeout(() => {
      if (this.tickPerSecond !== 0) {
        this.doTrainingTick()
      }
      this.runTrainingTicks()
    }, this.tickTime / 10)
  }

  @action
  doTrainingTick () {
    this.populationState.stepTraining()
    this.buildingState.stepBuilding(this)
    this.populationState.badGuysGenerate()
  }

  @computed get tickTime () {
    if (this.tickPerSecond === 0) {
      return 1000
    }
    return 1000 / this.tickPerSecond
  }

  @computed get resourcesSpeed () {
    return L(this.populationState.resourcesPerSecond(0))
      .map((val, key) => {
        return {
          name: this.resourcesState.resourcesMap.get(key).name,
          imgSrc: this.resourcesState.resourcesMap.get(key).imgSrc,
          amount: val + ' u/sec'
        }
      })
  }

  canBuy = createTransformer(unit =>
  this.resourcesState.moreThan(unit.cost, this.trainingMultiplier) &&
  this.populationState.units[0].amount >= this.trainingMultiplier)

  canUpgrade = createTransformer(building =>
    this.resourcesState.moreThan(building.cost, 1))

  @action
  buyUnit (unit) {
    this.resourcesState.applyReverseDiff(unit.cost, this.trainingMultiplier)
    this.populationState.trainUnit(unit, this.trainingMultiplier)
  }

  @action
  buyBuilding (building) {
    this.resourcesState.applyReverseDiff(building.cost, 1)
    this.buildingState.build(building)
  }

  @action
  setTrainingMultiplier (n) {
    this.trainingMultiplier = n
  }

  @action
  setSpeed (n) {
    this.tickPerSecond = n
  }

  @action
  setTax (n) {
    this.populationState.taxPercent = n
  }

  @action
  taxChange (n) {
    const old = this.populationState.taxPercent / 150
    this.setTax(n)
    const neww = this.populationState.taxPercent / 150
    setTimeout(() => {
      this.populationState.displeasureChange(-old + neww)
    }, 1)
  }

  @action
  attack (power) {
    if (power / 500 > Math.random()) {
      const res = {
        'FOOD': Math.round(_.random(0, power / 10)),
        'MONEY': Math.round(_.random(0, power / 10)),
        'WOOD': Math.round(_.random(0, power / 10)),
        'GEMS': Math.round(_.random(0, power / 10))
      }
      const resStr = L(res).map((val, key) => `${val} ${_.capitalize(key)}`).toArray().join(', ')
      this.resourcesState.applyDiff(res)
      this.msg.show('You won! Got ' + resStr)
      this.populationState.killSoldiers(Math.round(power / 30) + _.random(0, 3))
    } else {
      this.msg.show('You lose!')
      this.populationState.killSoldiers(Math.round(power / 4))
    }
  }
}
