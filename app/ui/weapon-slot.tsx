import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { ModelData } from "../lib/model";
import { CloseCombatWeapons, RangedWeapons } from "../lib/weapons";
import { Button } from "@nextui-org/react";
import { generateId } from "../lib/utils";
import { useModelControlsContext } from "./editor";

export default function WeaponSlots({ data }: { data: ModelData }) {
    return (
        <table className="table-fixed border-collapse">
            <thead>
                <tr>
                    <th className="w-auto border-1">Weapon</th>
                    <th className="border-1">Actions</th>
                    <th className="w-max border-1">Notes</th>
                </tr>
            </thead>
            <tbody>
                {data.attributes.firepower.level !== "None" &&
                    <WeaponSlot data={data} isRanged={true} />
                }
                < WeaponSlot data={data} isRanged={false} />
            </tbody>
        </table>
    )
}

export function WeaponSlot({ data, isRanged }: { data: ModelData, isRanged: boolean }) {
    const weapons = isRanged ? RangedWeapons : CloseCombatWeapons
    const slot = isRanged ? data.rangedWeapon : data.closeCombatWeapon
    const context = useModelControlsContext();

    return (
        <tr>
            <Dropdown className="dark">
                <DropdownTrigger>
                    <Button as={"td"} className="text-wrap whitespace-break-spaces w-full text-center">
                        {slot?.name}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={weapons} onAction={(key) => {
                    const weaponId = key.toString().split("|")[1];
                    const newWeapon = weapons.find((w) => w.id === weaponId);

                    if (newWeapon) {
                        const newModelData = new ModelData(data);
                        isRanged ? newModelData.rangedWeapon = { ...newWeapon } : newModelData.closeCombatWeapon = { ...newWeapon }
                        context.updateModel(data.id, newModelData);
                    }
                }}>
                    {(item) => (
                        <DropdownItem key={`${data.id}|${item.id}|${generateId()}`}
                            description={`cost: ${item.points}`}>
                            {item.name}
                        </DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
            <td className="text-center">{slot?.actions}</td>
            <td>{slot?.notes}</td>
        </tr>
    )
}