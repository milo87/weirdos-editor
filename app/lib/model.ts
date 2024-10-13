import { Attribute } from './attributes'
import { Item } from './equipment'
import { PsychicPower } from './powers'
import { Trait } from './traits'
import { Weapon } from './weapons'

export type ModelData = {
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

    powers?: PsychicPower[]

    equipment: Item[]
    maxEquipmentSlots: number

    leaderTrait?: Trait
    warbandTrait?: Trait

    rangedWeapon?: Weapon
    closeCombatWeapon?: Weapon
}
