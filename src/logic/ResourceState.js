import { observable, computed, action } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Resource from './Resource'

export default class ResourceState {
  @persist('list', Resource) @observable resourcesMap =
    L(Resource.types)
      .map(type => [type.id, new Resource(type, 10000)]).toObject()

  @computed get resources () {
    return L(this.resourcesMap).map(resource => resource).toArray()
  }

  @action applyDiff (diff) {
    L(diff).each((val, key) => {
      this.resourcesMap[key].amount += val
    })
  }
}
