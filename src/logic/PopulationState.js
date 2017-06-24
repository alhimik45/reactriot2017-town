import { observable, computed } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Man from './Man'

export default class PopulationState {
  @persist('list', Man) @observable people =
    L(Man.types)
      .map(type => new Man(type, 0)).toArray()

  static getProfessionCount (arr, profession) {
    return arr
  }

  @computed get population () {
    const p = L(this.people.slice())
    return p
      .filter(m => m.type.profession === 'none')
      .map(({ name, amount }) => ({ name, amount }))
      .concat(
      {
        name: 'Workers',
        amount: p.filter(m => m.type.profession === 'worker').sum(m => m.amount)
      },
      {
        name: 'Soldiers',
        amount: p.filter(m => m.type.profession === 'soldier').sum(m => m.amount)
      }
      ).toArray()
  }
}
