export type PsychicPower = {
    readonly id: string
    readonly name: string
    readonly cost: number
    readonly effect: string
}

export const Powers: PsychicPower[] = [
    {
        id: "fear",
        name: "Fear",
        cost: 1,
        effect: "Each enemy model within 1 stick who loses its opposed Will roll must move 1 stick away from the psychic"
    },
    {
        id: "healing",
        name: "Healing",
        cost: 1,
        effect: "1 model within 1 stick of this model and in LoS becomes ready"
    },
    {
        id: "meat-puppet",
        name: "Meat Puppet",
        cost: 2,
        effect: "Return 1 OoA model to the table and place within 1 stick of the psychic.The returned model's SPD is reduced by 1 (min 1), and rolls with -1DT for all rolls. A model can only be returned to the table once"
    },
    {
        id: "mind-control",
        name: "Mind Control",
        cost: 2,
        effect: "Targeted enemy takes one action of the psychic's choice"
    },
    {
        id: "mind-stab",
        name: "Mind Stab",
        cost: 3,
        effect: "Target 1 enemy model within 1 stick. Roll on the Under Fire table +3"
    },
    {
        id: "presience",
        name: "Prescience",
        cost: 1,
        effect: "Choose any model on the table to either gain +1DT or -1DT for all their actions this round"
    },
    {
        id: "telekinesis",
        name: "Telekinesis",
        cost: 1,
        effect: "Effect: move 1 obstacle up to 1 stick. Attack: move and enemy 1 stick"
    },
    {
        id: "teleport",
        name: "Teleport",
        cost: 1,
        effect: "Place the psychic anywhere on the board"
    }
] as const;