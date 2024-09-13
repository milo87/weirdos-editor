import { randomBytes } from "crypto";
import { ModelData } from "./model";
import { SpeedValues, DefenseValues, ProwessValues, FirepowerValues, WillpowerValues } from "./attributes";

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

export function calculateModelPoints(model: ModelData): number {
    let total = 0

    for (let a of Object.values(model.attributes)) {
        total += a.cost
    }

    return total
}

export function createDefaultModel(isLeader: boolean = false): ModelData {
    return {
        isLeader: isLeader,
        id: isLeader ? "leader" : generateId(),
        name: isLeader ? "Leader" : generateName(),
        attributes: {
            speed: SpeedValues[0],
            willpower: WillpowerValues[0],
            defense: DefenseValues[0],
            prowess: ProwessValues[0],
            firepower: isLeader ? FirepowerValues[1] : FirepowerValues[0],
        }
    }
}