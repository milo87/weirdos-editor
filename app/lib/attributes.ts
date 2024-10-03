export type Attribute = {
    level: string
    cost: number
}

export const SpeedValues: Attribute[] = [
    {
        level: "1",
        cost: 0
    },
    {
        level: "2",
        cost: 1
    },
    {
        level: "3",
        cost: 2
    }
]

export const DefenseValues: Attribute[] = [
    {
        level: "2d6",
        cost: 2
    },
    {
        level: "2d8",
        cost: 4
    },
    {
        level: "2d10",
        cost: 8
    }
]

export const FirepowerValues: Attribute[] = [
    {
        level: "None",
        cost: 0
    },
    {
        level: "2d8",
        cost: 2
    },
    {
        level: "2d10",
        cost: 4
    }
]

export const ProwessValues: Attribute[] = [
    {
        level: "2d6",
        cost: 2
    },
    {
        level: "2d8",
        cost: 4
    },
    {
        level: "2d10",
        cost: 6
    }
]

export const WillpowerValues: Attribute[] = [
    {
        level: "2d6",
        cost: 2
    },
    {
        level: "2d8",
        cost: 4
    },
    {
        level: "2d10",
        cost: 6
    }
]

export const attributeMappings = [
    {
        name: "speed",
        attributes: SpeedValues
    },
    {
        name: "defense",
        attributes: DefenseValues
    },
    {
        name: "firepower",
        attributes: FirepowerValues
    },
    {
        name: "prowess",
        attributes: ProwessValues
    },
    {
        name: "willpower",
        attributes: WillpowerValues
    }
]
