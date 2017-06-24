import { observable } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Building from './Building'

export default class BuildingState {
  @persist('list', Building) @observable buildings =
    L(Building.types)
      .map(type => new Building(type, 0)).toArray()
}
