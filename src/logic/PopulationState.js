import { action, computed, observable } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash'
import Unit from './Unit'
import Resource from './Resource'

export default class PopulationState {
  @persist('map', Unit) @observable unitsMap =
    observable.map(L(Unit.types)
      .map(type => [type.id, new Unit(type, 10000)]).toObject())

  @persist @observable mortalityCoef = 0.03
  @persist @observable mortalityFoodCoef = 1
  @persist @observable displeasureCoef = 0.01
  @persist @observable criminalCoef = 0.01
  @persist @observable taxPercent = 20

  getProfession (profession) {
    return L(this.units.slice())
      .filter(m => m.type.profession === profession)
  }

  @computed get mortalityVal () {
    return this.mortalityCoef * this.mortalityFoodCoef
  }

  @computed get mortality () {
    return {
      name: 'Mortality',
      imgSrc: '/static/mortality.svg',
      amount: _.round(this.mortalityVal * 100, 3) + '%'
    }
  }

  @computed get displeasure () {
    return {
      name: this.displeasureCoef >= 0 ? 'Anger' : 'Joy',
      imgSrc: this.displeasureCoef >= 0 ? '/static/anger.svg' : '/static/happiness.svg',
      amount: _.round(Math.abs(this.displeasureCoef * 100), 3)
    }
  }

  @computed get units () {
    return this.unitsMap.values()
  }

  @computed get tax () {
    return Math.max(Math.round(this.totalPopulationAmount / 1000 * this.taxPercent), 1)
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

  @computed get soldiersCount () {
    return this.getProfession('soldier')
      .sum(m => m.amount)
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
    const moneyId = Resource.types.MONEY.id
    if (res[foodId]) {
      res[foodId] -= this.totalPopulationAmount
    } else {
      res[foodId] = -this.totalPopulationAmount
    }
    const soldiersMoneyChange = Math.round(this.soldiersPower.amount / 4)
    if (res[moneyId]) {
      res[moneyId] -= this.tax - soldiersMoneyChange
    } else {
      res[moneyId] = this.tax - soldiersMoneyChange
    }
    return res
  }

  @action
  addIdle (count) {
    this.unitsMap.get(Unit.types.IDLE.id).amount += count
  }

  @action
  applyMortality () {
    this.units.forEach(unit => {
      unit.amount = Math.max(0, unit.amount - Math.round(
          (Math.random() < this.mortalityVal * 5) * Math.max(
            unit.amount * (this.mortalityVal ** 2), 1)))
    })
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

  @action
  displeasureChange (val) {
    this.displeasureCoef = this.displeasureCoef + val
  }

  @action
  killSoldiers (count) {
    let most = Math.round(count * 0.9)
    let rest = count - most
    for (const soldier of this.soldiers) {
      let killed = Math.min(soldier.amount, most)
      soldier.amount = Math.max(soldier.amount - most, 0)
      most -= killed
      if (most === 0) {
        most = rest
      }
    }
  }
}
