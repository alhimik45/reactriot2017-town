import { observable, computed, action } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Resource from './Resource'

export default class ResourceState {
  @persist('map', Resource) @observable resourcesMap =
    observable.map(L(Resource.types)
      .map(type => [type.id, new Resource(type, 10)]).toObject())

  moreThan (resources, count) {
    return L(resources).every((val, key) => this.resourcesMap.get(key).amount >= val * count)
  }

  @computed get resources () {
    return this.resourcesMap.values()
  }

  @action applyDiff (diff) {
    L(diff).each((val, key) => {
      this.resourcesMap.get(key).amount = Math.max(this.resourcesMap.get(key).amount + val, 0)
    })
  }

  @action applyReverseDiff (diff, count) {
    L(diff).each((val, key) => {
      this.resourcesMap.get(key).amount = Math.max(this.resourcesMap.get(key).amount - val * count, 0)
    })
  }
}
