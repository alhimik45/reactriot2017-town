import { observable, computed, action } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash/fp'
import Unit from './Unit'
import Resource from './Resource'

export default class PopulationState {
  @persist('map', Unit) @observable unitsMap =
    observable.map(L(Unit.types)
      .map(type => [type.id, new Unit(type, 0)]).toObject())

  @persist @observable mortality = { name: 'Mortality', imgSrc: '/static/mortality.svg', amount: 0 };
  @persist @observable displeasure = { name: 'Anger', imgSrc: '/static/anger.svg', amount: 0 };

  getProfession (profession) {
    return L(this.units.slice())
      .filter(m => m.type.profession === profession)
  }

  // @computed get growth () {
  //   return {
  //     name: 'Growth',
  //     imgSrc: '/static/growth.svg',
  //     amount: Math.round(this.totalPopulationAmount / 100 * 1.5 * (this.growthCoef ** 0.5))
  //   }
  // }

  @computed get units () {
    return this.unitsMap.values()
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

  @computed get populationStat () {
    return {
      name: 'Total',
      imgSrc: '/static/total.svg',
      amount: this.totalPopulationAmount
    }
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
      name: 'Power',
      imgSrc: '/static/power.svg',
      amount: this.getProfession('soldier')
        .sum(m => m.amount * m.type.power)
    }
  }

  @computed get resourcesPerSecond () {
    let res = _(this.units.slice())
      .map('resourcesDiff')
      .flatten()
      .reduce((res, [key, val]) => {
        if (res[key]) {
          res[key] += val
        } else {
          res[key] = val
        }
        return res
      }, {})
    const foodId = Resource.types.FOOD.id
    if (res[foodId]) {
      res[foodId] -= this.totalPopulationAmount
    } else {
      res[foodId] = -this.totalPopulationAmount
    }
    return res
  }

  @action
  addIdle (count) {
    this.unitsMap.get(Unit.types.IDLE.id).amount += count
  }

  @action
  trainUnit (unit, count) {
    this.unitsMap.get(Unit.types.IDLE.id).amount -= count
    unit.addToQueue(count)
  }

  @action
  stepTraining () {
    this.units.forEach(unit => unit.stepTraining())
  }
}
