import { observable, computed } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Man from './Man'

export default class PopulationState {
  @persist('list', Man) @observable people =
    L(Man.types)
      .map(type => new Man(type, 0)).toArray()

  getProfession (profession) {
    return L(this.people.slice())
      .filter(m => m.type.profession === profession)
  }

  @computed get population () {
    return this.getProfession('none')
      .map(({ name, amount }) => ({ name, amount }))
      .concat(
      {
        name: 'Workers',
        amount: this.getProfession('worker').sum(m => m.amount)
      },
      {
        name: 'Soldiers',
        amount: this.getProfession('soldier').sum(m => m.amount)
      }
      ).toArray()
  }

  @computed workers () {
    return this.getProfession('worker')
      .map(({ name, amount }) => ({ name, amount }))
  }

  @computed soldiers () {
    return this.getProfession('soldier')
      .map(({ name, amount }) => ({ name, amount }))
  }
}
