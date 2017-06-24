import { observable, computed, action } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Resource from './Resource'

export default class ResourceState {
  @persist('map', Resource) @observable resourcesMap =
    observable.map(L(Resource.types)
      .map(type => [type.id, new Resource(type, 950)]).toObject())

  moreThan (resources, count) {
    return L(resources).every((val, key) => this.resourcesMap.get(key).amount >= val * count)
  }

  @computed get resources () {
    return this.resourcesMap.values()
  }

  @action applyDiff (diff) {
    L(diff).each((val, key) => {
      this.resourcesMap.get(key).amount += val
    })
  }

  @action applyReverseDiff (diff, count) {
    L(diff).each((val, key) => {
      this.resourcesMap.get(key).amount -= val * count
    })
  }

  @action calcTax (tax, population) {
    this.resourcesMap.get(Resource.types.MONEY.id).amount += Math.round(population / 1000 * tax)
  }
}
