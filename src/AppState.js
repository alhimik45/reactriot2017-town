import { action, observable } from 'mobx'
import { create, persist } from 'mobx-persist'

export default class AppState {

  @persist @observable counter = 0

  constructor () {
    this.hydrate = create({ storage: localStorage })
    this.sync()
    setInterval(() => this.inc(), 1000)
  }

  sync () {
    // this.hydrate('save', this)
  }

  @action
  inc () {
    this.counter++
  }
}
