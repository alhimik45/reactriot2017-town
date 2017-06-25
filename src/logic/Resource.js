import { persist } from 'mobx-persist'
import { observable, computed } from 'mobx'
import L from 'lazy.js'
import _ from 'lodash/fp'

export default class Resource {
  static types = L({
    WOOD: {},
    GEMS: {},
    MONEY: {},
    FOOD: {},
    ELEC: { limited: true }
  }).map((val, key) => {
    val.id = key
    return [key, val]
  }).toObject()

  @persist('object') @observable type
  @persist @observable amount
  @persist @observable max

  @computed get limited () {
    return this.type.limited
  }

  @computed get name () {
    return _.capitalize(this.type.id)
  }

  @computed get imgSrc () {
    return `/static/${this.type.id.toLowerCase()}.svg`
  }

  constructor (type, amount) {
    this.type = type
    this.max = 0
    this.amount = amount
  }
}
