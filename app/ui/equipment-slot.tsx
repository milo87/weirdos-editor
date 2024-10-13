import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { ModelData } from "../lib/model";
import { Button } from "@nextui-org/react";
import { generateId } from "../lib/utils";
import { Equipment, Item } from "../lib/equipment";
import { useModelControlsContext } from "./editor";
import { Warband } from "../lib/warband";

export default function EquipmentSlots({ data, warbandData }: { data: ModelData, warbandData: Warband }) {
    let numEquipmentSlots = data.maxEquipmentSlots
    if (warbandData?.warbandTrait && warbandData.warbandTrait.id === "cyborgs") {
        numEquipmentSlots += 1;
    }
    const equipmentSlots = data.equipment.slice(0, numEquipmentSlots).map((item, index) => <EquipmentSlot key={`${data.id}-equipment-${index}`} data={data} item={item} index={index} />)

    return (
        <table className="table-fixed">
            <caption>Equipment</caption>
            <colgroup>
                <col className="w-1/5"></col>
                <col className="w-1/12"></col>
                <col className="w-fit"></col>
            </colgroup>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Effect</th>
                </tr>
            </thead>
            <tbody>
                {equipmentSlots}
            </tbody>
        </table>
    )
}

function EquipmentSlot({ data, item, index }: { data: ModelData, item: Item, index: number }) {
    const context = useModelControlsContext();

    return (
        <tr>
            <th scope="col">
                <Dropdown className="dark">
                    <DropdownTrigger>
                        <Button className="text-wrap min-w-full min-h-fit">
                            {item.name}
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={Equipment} onAction={(key) => {
                        const itemId = key.toString().split("|")[1];
                        const newItem = Equipment.find((i) => i.id === itemId);

                        if (newItem) {
                            let newEquipment = [...data.equipment];
                            newEquipment[index] = { ...newItem };
                            let newModelData = { ...data, equipment: newEquipment }
                            context.updateModel(data.id, newModelData);
                        }
                    }}>
                        {(item) => (
                            <DropdownItem
                                key={`${data.id}|${item.id}|${generateId()}`}
                                description={`cost: ${item.points}pt${item.points === 1 ? "" : "s"}`}
                            >
                                {item.name}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </th>
            <td className="p-4 text-center">{item.type}</td>
            <td className="p-4">{item.effect}</td>
        </tr>
    )
}