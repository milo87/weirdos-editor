export type Weapon = {
    readonly id: string,
    readonly name: string,
    readonly actions: number,
    readonly notes: string,
    readonly points: number
}

export const RangedWeapons: Weapon[] = [
    {
        id: "pistol-auto",
        name: "Auto Pistol",
        actions: 3,
        notes: "-DT range > 1 stick",
        points: 0
    },
    {
        id: "pistol-heavy",
        name: "Heavy Pistol",
        actions: 2,
        notes: "+1 to Under Fire rolls, -1DT past > stick",
        points: 1
    },
    {
        id: "pistol-energy",
        name: "Energy Pistol",
        actions: 3,
        notes: "Reroll FP rolls of 1, -1DT range > 1 stick",
        points: 2
    },
    {
        id: "rifle-auto",
        name: "Auto Rifle",
        actions: 3,
        notes: "Aim 1",
        points: 1
    },
    {
        id: "rifle-heavy",
        name: "Heavy Rifle",
        actions: 2,
        notes: "Aim 1, +1 to Under Fire rolls",
        points: 2
    },
    {
        id: "rifle-sniper",
        name: "Sniper Rifle",
        actions: 1,
        notes: "Aim 2, cannot target enemies < 1 stick away, reroll FP rolls of 1, +1 to Under Fire rolls",
        points: 3
    },
    {
        id: "shotgun",
        name: "Shotgun",
        actions: 2,
        notes: "Range ≤ 1 stick: +1 to Under Fire rolls. Range ≥ 1 stick: -1DT, reroll FP rolls of 1",
        points: 2
    },
    {
        id: "rifle-energy",
        name: "Energy Rifle",
        actions: 2,
        notes: "Aim 1, reroll FP rolls of 1",
        points: 2
    },
    {
        id: "flamer",
        name: "Flamer",
        actions: 1,
        notes: "Cone AoE",
        points: 2
    },
    {
        id: "rocket-launcher",
        name: "Rocket Launcher",
        actions: 1,
        notes: "Aim 2, cannot target enemies < 1 stick away, Blast AOE",
        points: 3
    },
    {
        id: "auto-cannon",
        name: "Auto-cannon",
        actions: 3,
        notes: "Reroll FP rolls of 1 or 2",
        points: 3
    }
] as const;

export const CloseCombatWeapons: Weapon[] = [
    {
        id: "unarmed",
        name: "Unarmed",
        actions: 3,
        notes: "-1DT to PRW rolls",
        points: 0
    },
    {
        id: "claws-teeth",
        name: "Claws & Teeth",
        actions: 3,
        notes: "-",
        points: 2
    },
    {
        id: "horrible-claws-teeth",
        name: "Horrible Claws & Teeth",
        actions: 3,
        notes: "+1 to Under Attack rolls",
        points: 3
    },
    {
        id: "melee-weapon",
        name: "Melee Weapon",
        actions: 2,
        notes: "-",
        points: 1
    },
    {
        id: "powered-weapon",
        name: "Powered Weapon",
        actions: 2,
        notes: "Reroll PRW rolls of 1",
        points: 2
    },
    {
        id: "melee-weapon-large",
        name: "Large Melee Weapon",
        actions: 1,
        notes: "+1 to Under Attack Rolls",
        points: 1
    },
    {
        id: "powered-weapon-large",
        name: "Large Powered Weapon",
        actions: 1,
        notes: "Reroll PRW rolls of 1, +1 to Under Attack rolls",
        points: 3
    },
    {
        id: "whip-tail",
        name: "Whip/Tail",
        actions: 2,
        notes: "Can target enemies up to 1 stick away",
        points: 2
    }
] as const;