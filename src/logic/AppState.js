import { observable, computed } from 'mobx'
import { create, persist } from 'mobx-persist'
import ResourceState from './ResourceState'
import PopulationState from './PopulationState'

export default class AppState {
  @persist('object', ResourceState)
  @observable
  resourcesState = new ResourceState()

  @persist('object', PopulationState)
  @observable
  populationState = new PopulationState()

  @persist @observable tickPerSecond = 1

  constructor () {
    this.hydrate = create({ storage: window.localStorage })
    this.sync()
    // this.doTick()
    this.runTicks()
  }

  sync () {
    // this.hydrate('save', this)
  }

  runTicks () {
    setTimeout(() => {
      this.doTick()
      this.runTicks()
    }, this.tickTime)
  }

  doTick () {
    this.resourcesState.applyDiff(this.populationState.resourcesPerSecond)
  }

  @computed get tickTime () {
    return 1000 / this.tickPerSecond
  }
}
