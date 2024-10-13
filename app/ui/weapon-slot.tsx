import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { ModelData } from "../lib/model";
import { CloseCombatWeapons, RangedWeapons } from "../lib/weapons";
import { Button } from "@nextui-org/react";
import { generateId } from "../lib/utils";
import { useModelControlsContext } from "./editor";

export enum WeaponSlotEnum {
    RANGED,
    CLOSECOMBAT
}

export default function WeaponSlots({ data }: { data: ModelData }) {
    return (
        <table>
            <caption>Weapons</caption>
            <colgroup>
                <col className="w-1/5"></col>
                <col className="w-1/12"></col>
            </colgroup>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col" className="p-4">Max Actions</th>
                    <th scope="col">Notes</th>
                </tr>
            </thead>
            <tbody>
                {data.attributes.firepower.level !== "None" &&
                    <WeaponSlot data={data} type={WeaponSlotEnum.RANGED} />
                }
                < WeaponSlot data={data} type={WeaponSlotEnum.CLOSECOMBAT} />
            </tbody>
        </table>
    )
}

export function WeaponSlot({ data, type }: { data: ModelData, type: WeaponSlotEnum }) {
    const weapons = type === WeaponSlotEnum.RANGED ? RangedWeapons : CloseCombatWeapons
    const slot = type === WeaponSlotEnum.RANGED ? data.rangedWeapon : data.closeCombatWeapon
    const context = useModelControlsContext();

    return (
        <tr>
            <th scope="col">
                <Dropdown className="dark">
                    <DropdownTrigger>
                        <Button className="text-wrap min-w-full min-h-fit">
                            {slot?.name}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={weapons} onAction={(key) => {
                        const weaponId = key.toString().split("|")[1];
                        const newWeapon = weapons.find((w) => w.id === weaponId);

                        if (newWeapon) {
                            const newModelData = { ...data };
                            type === WeaponSlotEnum.RANGED ?
                                newModelData.rangedWeapon = { ...newWeapon }
                                : newModelData.closeCombatWeapon = { ...newWeapon }
                            context.updateModel(data.id, newModelData);
                        }
                    }}>
                        {(item) => (
                            <DropdownItem
                                key={`${data.id}|${item.id}|${generateId()}`}
                                description={`cost: ${item.points}pt${item.points > 1 || item.points === 0 ? "s" : ""}`}
                            >
                                {item.name}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </th>
            <td className="text-center">{slot?.actions}</td>
            <td>{slot?.notes}</td>
        </tr>
    )
}