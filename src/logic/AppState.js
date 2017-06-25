import { observable, computed, action, createTransformer } from 'mobx'
import { create, persist } from 'mobx-persist'
import ResourceState from './ResourceState'
import Resource from './Resource'
import PopulationState from './PopulationState'
import BuildingState from './BuildingState'
import L from 'lazy.js'

export default class AppState {
  @persist('object', ResourceState)
  @observable
  resourcesState = new ResourceState()

  @persist('object', PopulationState)
  @observable
  populationState = new PopulationState()

  @persist('object', PopulationState)
  @observable
  buildingState = new BuildingState()

  @persist @observable tickPerSecond = 1
  @persist @observable trainingMultiplier = 1
  @persist @observable taxPercent = 20

  constructor () {
    this.hydrate = create({ storage: window.localStorage })
    this.sync()
    this.populationState.units[3].amount++
    this.populationState.units[0].amount += 10000
    // this.doTick()
    this.runResourceTicks()
    this.runTrainingTicks()
  }

  sync () {
    // this.hydrate('save', this)
  }

  runResourceTicks () {
    setTimeout(() => {
      this.doResourceTick()
      this.runResourceTicks()
    }, this.tickTime)
  }

  @action
  doResourceTick () {
    this.resourcesState.applyDiff(this.populationState.resourcesPerSecond)
    this.resourcesState.applyTax(this.tax)
  }

  runTrainingTicks () {
    setTimeout(() => {
      this.doTrainingTick()
      this.runTrainingTicks()
    }, this.tickTime / 10)
  }

  @action
  doTrainingTick () {
    this.populationState.stepTraining()
    this.buildingState.stepBuilding(this)
  }

  @computed get tax () {
    return Math.round(this.populationState.totalPopulationAmount / 1000 * this.taxPercent)
  }

  @computed get tickTime () {
    return 1000 / this.tickPerSecond
  }

  @computed get resourcesSpeed () {
    return L(this.populationState.resourcesPerSecond)
      .map((val, key) => {
        return {
          name: this.resourcesState.resourcesMap.get(key).name,
          imgSrc: this.resourcesState.resourcesMap.get(key).imgSrc,
          amount: val + ' u/sec'
        }
      }).concat({
        name: this.resourcesState.resourcesMap.get(Resource.types.MONEY.id).name,
        imgSrc: this.resourcesState.resourcesMap.get(Resource.types.MONEY.id).imgSrc,
        amount: this.tax + ' u/sec'
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
    this.taxPercent = n
  }
}
