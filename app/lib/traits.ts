import { RangedWeapons } from "./weapons"

export enum TraitTarget {
    Attribute = "attribute",
    RangedWeapon = "ranged",
    CloseCombatWeapon = "melee",
    Equipment = "equipment"
}

type TraitEffect = {
    targets: string[]
    pointsAdjustment: number
    targetType: TraitTarget
}

export type Trait = {
    id: string
    name: string
    cost: number
    description: string
    effects?: TraitEffect[]
}

export const LeaderTraits: Trait[] = [
    {
        id: "bounty-hunter",
        name: "Bounty Hunter",
        cost: 0,
        description: "Once per round, when a model from your warband is touching a down or staggered enemy, it can take a Use Item action to make the enemy model out of action"
    },
    {
        id: "healer",
        name: "Healer",
        cost: 0,
        description: "During the Initiative Phase, one of your models within one stick of your leader may make a free Stand or Recover action with +1DT"
    },
    {
        id: "majestic",
        name: "Majestic",
        cost: 0,
        description: "Any time one of your warband has to make a Willpower roll, that model may use the Leader's Willpower instead"
    },
    {
        id: "monstrous",
        name: "Monstrous",
        cost: 0,
        description: "Non-Leader models must win a Willpower roll vs. your leader to move into contact"
    },
    {
        id: "political",
        name: "Political Officer",
        cost: 0,
        description: "During the Initiative Phase, before rolling, take one of your Warband within LOS of your leader out of action to make all other models in the Warband ready, remove the broken condition from your warband, and gain + 1DT to this Initiative roll"
    },
    {
        id: "sorcerer",
        name: "Sorcerer",
        cost: 0,
        description: "Psychic Powers actions cost 1 action instead of 2, but may still only use 1 per turn"
    },
    {
        id: "tactician",
        name: "Tactician",
        cost: 0,
        description: "+1DT to Initiative rolls"
    }
]

export const WarbandTraits: Trait[] = [
    {
        id: "cyborgs",
        name: "Cyborgs",
        cost: 0,
        description: "All members of the Warband can purchase 1 additional piece of equipment"
    },
    {
        id: "fanatics",
        name: "Fanatics",
        cost: 0,
        description: "Roll Willpower with +1DT for all rolls expect Psychic Powers"
    },
    {
        id: "living-weapons",
        name: "Living Weapons",
        cost: 0,
        description: "Unarmed attacks do not have -1DT to Prowess rolls"
    },
    {
        id: "heavily-armed",
        name: "Heavily Armed",
        cost: 0,
        description: "All Ranged weapons cost 1 point less",
        effects: [
            {
                targetType: TraitTarget.RangedWeapon,
                targets: RangedWeapons.map((weapon) => weapon.id),
                pointsAdjustment: -1
            }
        ]
    },
    {
        id: "mutants",
        name: "Mutants",
        cost: 0,
        description: "Speed, Claws & Teeth, Horrible Claws & Teeth, and Whip/Tail cost 1 less point",
        effects: [
            {
                targetType: TraitTarget.CloseCombatWeapon,
                targets: ["claws-teeth", "horrible-claws-teeth", "whip-tail"],
                pointsAdjustment: -1
            },
            {
                targetType: TraitTarget.Attribute,
                targets: ["speed"],
                pointsAdjustment: -1
            }
        ]
    },
    {
        id: "soldiers",
        name: "Soldiers",
        cost: 0,
        description: "Grenades, Heavy Armour and Medkits may be purchased for free. They still use a model's equipment slots",
        effects: [
            {
                targetType: TraitTarget.Equipment,
                targets: ["grenade", "armour-heavy", "medkit"],
                pointsAdjustment: 0
            }
        ]
    },
    {
        id: "undead",
        name: "Undead",
        cost: 0,
        description: "A second staggered condition does not take models in this Warband out of action"
    }
]