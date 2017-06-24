import { observable } from 'mobx'
import { create, persist } from 'mobx-persist'
import ResourceState from './ResourceState'
import PopulationState from './PopulationState'
import BuildingState from './BuildingState'

export default class AppState {
  @persist('object', ResourceState)
  @observable
  resourcesState = new ResourceState()
  populationState = new PopulationState()
  buildingState = new BuildingState()

  constructor () {
    this.hydrate = create({ storage: window.localStorage })
    this.sync()
  }

  sync () {
    // this.hydrate('save', this)
  }
}
