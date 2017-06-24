import { observable, computed, action, createTransformer } from 'mobx'
import { create, persist } from 'mobx-persist'
import ResourceState from './ResourceState'
import PopulationState from './PopulationState'
import BuildingState from './BuildingState'

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

  constructor () {
    this.hydrate = create({ storage: window.localStorage })
    this.sync()
    this.populationState.units[3].amount++
    this.populationState.units[0].amount += 10
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
  }

  runTrainingTicks () {
    setTimeout(() => {
      this.doTrainingTick()
      this.runTrainingTicks()
    }, this.tickTime / 50)
  }

  @action
  doTrainingTick () {
    this.populationState.stepTraining()
  }

  @computed get tickTime () {
    return 1000 / this.tickPerSecond
  }

  canBuy = createTransformer(unit =>
  this.resourcesState.moreThan(unit.cost) &&
  this.populationState.units[0].amount > 0)

  @action
  buyUnit (unit) {
    this.resourcesState.applyReverseDiff(unit.cost)
    this.populationState.trainUnit(unit)
  }

  @action
  setTrainingMultiplier (n) {
    this.trainingMultiplier = n
  }
}
