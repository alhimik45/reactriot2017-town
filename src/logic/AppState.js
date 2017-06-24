import { observable } from 'mobx'
import { create, persist } from 'mobx-persist'
import ResourceState from './ResourceState'
import PopulationState from './PopulationState'

export default class AppState {
  @persist('object', ResourceState)
  @observable
  resourceState = new ResourceState()
  populationState = new PopulationState()

  constructor () {
    this.hydrate = create({ storage: window.localStorage })
    this.sync()
  }

  sync () {
    // this.hydrate('save', this)
  }
}
