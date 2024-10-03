import { Attribute } from './attributes'
import { Trait } from './traits'
import { Weapon } from './weapons'

export class ModelData {
    constructor(data: ModelData) {
        this.id = data.id
        this.name = data.name
        this.isLeader = data.isLeader
        this.attributes = data.attributes
        this.leaderTrait = data.leaderTrait
        this.warbandTrait = data.warbandTrait
        this.rangedWeapon = data.rangedWeapon
        this.closeCombatWeapon = data.closeCombatWeapon
    }

    id: string
    name: string
    isLeader: boolean

    attributes: {
        speed: Attribute
        defense: Attribute
        firepower: Attribute
        prowess: Attribute
        willpower: Attribute
    }

    leaderTrait?: Trait
    warbandTrait?: Trait

    rangedWeapon?: Weapon
    closeCombatWeapon?: Weapon
}
