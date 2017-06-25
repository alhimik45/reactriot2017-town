import { observable, computed, action } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Building from './Building'

export default class BuildingState {
  @persist('map', Building) @observable buildingsMap =
    observable.map(L(Building.types)
      .map(type => [type.id, new Building(type, 0)]).toObject())

  @computed get buildings () {
    return this.buildingsMap.values()
  }

  @action
  build (building) {
    building.build()
  }

  @action
  stepBuilding (appState) {
    this.buildings.forEach(building => building.stepBuilding(appState))
  }
}
