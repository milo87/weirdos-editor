import { randomBytes } from "crypto";
import { ModelData } from "./model";
import { SpeedValues, DefenseValues, ProwessValues, FirepowerValues, WillpowerValues } from "./attributes";
import { CloseCombatWeapons, RangedWeapons } from "./weapons";
import { Equipment } from "./equipment";
import { Warband } from "./warband";
import { TraitTarget } from "./traits";

const nameList: Array<string> = [
    'Time', 'Past', 'Future', 'Dev',
    'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling',
    'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
    'Green', 'Yellow', 'Gold', 'Demon', 'Demonic', 'Panda', 'Cat',
    'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'XX', 'Bandit',
    'Fear', 'Light', 'Glow', 'Tread', 'Deep', 'Deeper', 'Deepest',
    'Mine', 'Your', 'Worst', 'Enemy', 'Hostile', 'Force', 'Video',
    'Game', 'Donkey', 'Mule', 'Colt', 'Cult', 'Cultist', 'Magnum',
    'Gun', 'Assault', 'Recon', 'Trap', 'Trapper', 'Redeem', 'Code',
    'Script', 'Writer', 'Near', 'Close', 'Open', 'Cube', 'Circle',
    'Geo', 'Genome', 'Germ', 'Spud', 'Shot', 'Echo', 'Beta', 'Alpha',
    'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Lord', 'King',
    'Duke', 'Rest', 'Fire', 'Flame', 'Morrow', 'Break', 'Breaker', 'Numb',
    'Ice', 'Cold', 'Rotten', 'Sick', 'Sickly', 'Janitor', 'Camel', 'Rooster',
    'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase', 'Big',
    'Small', 'Short', 'Tall', 'Bounty', 'Hunter', 'Cracked', 'Broken',
    'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit', 'Lies',
    'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker',
    'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two', 'Uno', 'Slice',
    'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound',
    'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble',
    'Sandwich', 'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death',
    'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Head', 'Theme', 'Grand',
    'Cool', 'Kid', 'Boy', 'Girl', 'Vortex', 'Paradox'
];

export function generateName(): string {
    return nameList[Math.floor(Math.random() * nameList.length)];
}

export function generateId(): string {
    return randomBytes(8).toString("hex")
}

export function calculateModelPoints(model: ModelData, warband: Warband): number {
    let total = 0

    // Some traits make attributes cheaper
    type k_t = keyof typeof model.attributes;
    for (const [k, v] of Object.entries(model.attributes)) {
        let cost = v.cost;
        warband?.warbandTrait?.effects?.filter((trait) => trait.targetType === TraitTarget.Attribute)
            ?.map((trait) => {
                for (const target of trait.targets) {
                    if (target as k_t === k) {
                        if (trait.pointsAdjustment === 0) cost = trait.pointsAdjustment;
                        else Math.max(0, cost += trait.pointsAdjustment);
                    }
                }
            })
        total += cost;
    }

    // Calculate points for all equipment
    let maxEquipmentSlots = model.maxEquipmentSlots;
    if (warband.warbandTrait && warband.warbandTrait.id === "cyborgs") {
        maxEquipmentSlots += 1;
    }

    for (const i of model.equipment.slice(0, maxEquipmentSlots)) {
        let cost = i.points;
        // Some traits make equipment cheaper
        warband.warbandTrait?.effects?.filter((trait) => trait.targetType === TraitTarget.Equipment)
            ?.map((trait) => {
                for (const target of trait.targets) {
                    if (target === i.id) {
                        if (trait.pointsAdjustment === 0) cost = trait.pointsAdjustment;
                        else Math.max(0, cost += trait.pointsAdjustment);
                    }
                }
            })
        total += cost;
    }

    if (model.closeCombatWeapon) {
        let w = model.closeCombatWeapon;
        let cost = w.points;
        warband.warbandTrait?.effects?.filter((trait) => trait.targetType === TraitTarget.CloseCombatWeapon)
            ?.map((trait) => {
                for (const target of trait.targets) {
                    if (target === w.id) {
                        if (trait.pointsAdjustment === 0) cost = trait.pointsAdjustment;
                        else cost += trait.pointsAdjustment;
                    }
                }
            })
        total += Math.max(0, cost);
    }

    if (model.rangedWeapon) {
        let w = model.rangedWeapon;
        let cost = w.points;
        warband.warbandTrait?.effects?.filter((trait) => trait.targetType === TraitTarget.RangedWeapon)
            ?.map((trait) => {
                for (const target of trait.targets) {
                    if (target === w.id) {
                        if (trait.pointsAdjustment === 0) cost = trait.pointsAdjustment;
                        else cost += trait.pointsAdjustment;

                    }
                }
            })
        total += Math.max(0, cost);
    }

    model.powers?.map((p) => total += p.cost);

    return total
}

export function createDefaultModel(isLeader: boolean = false): ModelData {
    return {
        isLeader: isLeader,
        id: isLeader ? "leader" : generateId(),
        name: isLeader ? "Leader" : generateName(),
        attributes: {
            speed: { ...SpeedValues[0] },
            willpower: { ...WillpowerValues[0] },
            defense: { ...DefenseValues[0] },
            prowess: { ...ProwessValues[0] },
            firepower: { ...isLeader ? FirepowerValues[1] : FirepowerValues[0] },
        },
        rangedWeapon: { ...RangedWeapons[0] },
        closeCombatWeapon: { ...CloseCombatWeapons[0] },
        maxEquipmentSlots: isLeader ? 2 : 1,
        equipment: new Array(3).fill({ ...Equipment[0] }),
    }
}

export function modelDataReplacer(_key: string, value: Map<string, any>) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries())
        };
    }

    return value;
}

export function modelDataReviver(_key: string, value: { dataType: string, value: any }) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }

    return value;
}
