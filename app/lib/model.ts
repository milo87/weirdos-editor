import { Attribute } from './attributes'
import { Trait } from './traits'

export interface ModelData {
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
}
