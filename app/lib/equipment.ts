export enum EquipmentType {
    PASSIVE = "P",
    ACTIVE = "A"
}

export type Item = {
    readonly id: string,
    readonly name: string,
    readonly type: EquipmentType,
    readonly effect: string,
    readonly points: number
}

export const Equipment: Item[] = [
    {
        id: "none",
        name: "None",
        type: EquipmentType.PASSIVE,
        effect: "-",
        points: 0
    },
    {
        id: "cybernetics",
        name: "Cybernetics",
        type: EquipmentType.ACTIVE,
        effect: "+1 to PRW rolls",
        points: 1
    },
    {
        id: "grenade",
        name: "Grenade",
        type: EquipmentType.ACTIVE,
        effect: "Targets point up 1 stick from attacker. Blast AOE, 2d10 FP, +1 to Under Fire rolls",
        points: 1
    },
    {
        id: "armour-heavy",
        name: "Heavy Armour",
        type: EquipmentType.PASSIVE,
        effect: "+1 to DEF rolls",
        points: 1
    },
    {
        id: "jump-pack",
        name: "Jump Pack",
        type: EquipmentType.PASSIVE,
        effect: "The model can ignore terrain and other models when taking Move actions",
        points: 1
    },
    {
        id: "medkit",
        name: "Medkit",
        type: EquipmentType.ACTIVE,
        effect: "One model touching this model becomes ready",
        points: 1
    },
    {
        id: "psychic-focus",
        name: "Psychic Focus",
        type: EquipmentType.PASSIVE,
        effect: "+1 to Will rolls",
        points: 1
    },
    {
        id: "stealth-suit",
        name: "Stealth Suit",
        type: EquipmentType.PASSIVE,
        effect: "If this model's base touches a piece of terrain, enemy models do not LoS unless they are within 1 stick the stealthy model",
        points: 2
    },
    {
        id: "reticule",
        name: "Targeting Reticule",
        type: EquipmentType.PASSIVE,
        effect: "+1 to FP rolls",
        points: 1
    }
] as const;