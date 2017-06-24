import { persist } from 'mobx-persist'
import { observable, computed } from 'mobx'
import L from 'lazy.js'

export default class Resource {
  static types = L({
    WOOD: {},
    METAL: {},
    MONEY: {},
    FOOD: {},
    POPULATION: { limited: true },
    ELECTRICITY: { limited: true }
  }).map((val, key) => {
    val.id = key
    return [key, val]
  }).toObject()

  @persist type
  @persist @observable amount
  @persist @observable max

  @computed get limited () {
    return this.type.limited
  }

  @computed get name () {
    return this.type.id
  }

  @computed get imgSrc () {
    return this.type.id + '.svg'
  }

  constructor (type, amount) {
    this.type = type
    this.max = 0
    this.amount = amount
  }
}
