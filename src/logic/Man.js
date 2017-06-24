import { persist } from 'mobx-persist'
import L from 'lazy.js'
import _ from 'lodash/fp'
import { observable, computed } from 'mobx'
import Resource from './Resource'

export default class Man {
  static types = L({
    UNEMPLOYED: { untrainable: true },

    MINER: {
      profession: 'worker',
      resourceEffect: L([[Resource.types.METAL.id, 5]]).toObject()
    },
    WOODSMAN: {
      profession: 'worker',
      resourceEffect: L([[Resource.types.WOOD.id, 5]]).toObject()
    },
    FARMER: {
      profession: 'worker',
      resourceEffect: L([[Resource.types.FOOD.id, 5]]).toObject()
    },
    HUNTER: {
      profession: 'worker',
      resourceEffect: L([[Resource.types.FOOD.id, 10]]).toObject()
    },
    BUILDER: {
      profession: 'worker',
      description: 'Increases construction speed. The more buildings the more builders you need'
    },

    RECRUIT: { profession: 'soldier', power: 1 },
    SERGEANT: { profession: 'soldier', power: 3 },
    OFFICER: { profession: 'soldier', power: 5 },
    GENERAL: {
      profession: 'soldier',
      description: 'General significantly increases power of army, but too many generals can lead to unrest and RIOT'
    },

    RIOTER: {
      profession: 'worker',
      untrainable: true,
      resourceEffect: L([
        [Resource.types.FOOD.id, () => _.random(-12, 3)],
        [Resource.types.WOOD.id, () => _.random(-12, 3)],
        [Resource.types.METAL.id, () => _.random(-12, 3)]
      ]).toObject()
    },
    CRIMINAL: {
      profession: 'worker',
      untrainable: true,
      resourceEffect: L([
        [Resource.types.FOOD.id, () => _.random(-3, 1)],
        [Resource.types.WOOD.id, () => _.random(-3, 1)],
        [Resource.types.METAL.id, () => _.random(-3, 1)]
      ]).toObject()
    },
    PRISONER: {
      profession: 'worker',
      untrainable: true,
      resourceEffect: L([
        [Resource.types.FOOD.id, () => _.random(-1, 6)],
        [Resource.types.WOOD.id, () => _.random(-1, 6)],
        [Resource.types.METAL.id, () => _.random(-1, 6)]
      ]).toObject()
    }
  }).map((val, key) => {
    val.id = key
    return [key, val]
  }).toObject()

  @persist @observable type
  @persist @observable amount

  @computed get name () {
    return this.type.id
  }

  @computed get imgSrc () {
    return this.type.id.toLowerCase() + '.svg'
  }

  constructor (type, amount) {
    this.type = type
    this.amount = amount
  }
}
