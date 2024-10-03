import { ModelData } from "./model"
import { Trait } from "./traits"

export type Warband = {
    name: string
    models: Map<string, ModelData>
    leaderTrait?: Trait
    warbandTrait?: Trait
}