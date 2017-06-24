import { observable } from 'mobx'
import { persist } from 'mobx-persist'
import L from 'lazy.js'
import Resource from './Resource'

export default class ResourceState {
  @persist('list', Resource) @observable resources =
    L(Resource.types)
      .map(type => new Resource(type, 0)).toArray()
}
