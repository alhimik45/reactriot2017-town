import { observable, computed } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Man from './Man'

export default class PopulationState {
  @persist('list', Man) @observable people =
    L(Man.types)
      .map(type => new Man(type, 0)).toArray()

  @persist @observable growth = {name: 'Growth', imgSrc: '/static/growth.svg', amount: '0'};
  @persist @observable mortality = {name: 'Mortality', imgSrc: '/static/mortality.svg', amount: '0'};
  @persist @observable displeasure= {name: 'Displeasure', imgSrc: '/static/displeasure.svg', amount: '0'};

  getTotal () {
    let total = 0
    this.population.map(e => (total = total + e.amount))
    return total
  }

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
        amount: this.getProfession('worker').sum(m => m.amount),
        imgSrc: '/static/worker.svg'
      },
      {
        name: 'Soldiers',
        amount: this.getProfession('soldier').sum(m => m.amount),
        imgSrc: '/static/soldier.svg'
      }
      ).toArray()
  }

  @computed get workers () {
    return this.getProfession('worker').toArray()
  }

  @computed get soldiers () {
    return this.getProfession('soldier').toArray()
  }

  @computed get soldiersPower () {
    return {
      name: 'Military power',
      imgSrc: '/static/power.svg',
      amount: this.getProfession('soldier')
        .sum(m => m.amount * m.type.power)
    }
  }
}
