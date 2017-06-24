import { observable } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Man from './Man'

export default class PopulationState {
  @persist('list', Man) @observable people =
    L(Man.types)
      .map(type => new Man(type, 0)).toArray()
}
