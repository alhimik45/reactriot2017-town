import { observable, computed, action } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash/fp'
import Unit from './Unit'

export default class PopulationState {
  @persist('map', Unit) @observable unitsMap =
    observable.map(L(Unit.types)
      .map(type => [type.id, new Unit(type, 0)]).toObject())

  @persist @observable growth = { name: 'Growth', imgSrc: '/static/growth.svg', amount: 0 };
  @persist @observable mortality = { name: 'Mortality', imgSrc: '/static/mortality.svg', amount: 0 };
  @persist @observable displeasure = { name: 'Anger', imgSrc: '/static/anger.svg', amount: 0 };

  doTick () {
    this.resourcesState.applyDiff(this.populationState.resourcesPerSecond)
  }

  getProfession (profession) {
    return L(this.units.slice())
      .filter(m => m.type.profession === profession)
  }

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
    return _(this.units.slice())
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
