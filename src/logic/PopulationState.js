import { observable, computed } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Unit from './Unit'

export default class PopulationState {
  @persist('list', Unit) @observable units =
    L(Unit.types)
      .map(type => new Unit(type, 0)).toArray()

  @persist @observable growth = { name: 'Growth', imgSrc: '/static/growth.svg', amount: 0 };
  @persist @observable mortality = { name: 'Mortality', imgSrc: '/static/mortality.svg', amount: 0 };
  @persist @observable displeasure = { name: 'Displeasure', imgSrc: '/static/displeasure.svg', amount: 0 };

  getProfession (profession) {
    return L(this.units.slice())
      .filter(m => m.type.profession === profession)
  }

  @computed get population () {
    return this.getProfession('none')
      .concat(
      {
        name: 'Workers',
        amount: this.getProfession('worker').sum(m => m.amount),
        imgSrc: '/static/worker.svg'
      },
      {
        name: 'Soldiers',
        amount: this.getProfession('soldier').sum(m => m.amount),
        imgSrc: '/static/recruit.svg'
      }
      ).toArray()
  }

  @computed get totalPopulationAmount () {
    return L(this.population).sum(m => m.amount)
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
