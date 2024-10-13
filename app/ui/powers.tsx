import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";
import { ModelData } from "../lib/model";
import { Powers, PsychicPower } from "../lib/powers";
import { Button } from "@nextui-org/react";
import { generateId } from "../lib/utils";
import { FaRegTrashAlt, FaPlusCircle } from "react-icons/fa";
import { useModelControlsContext } from "./editor";


export default function PowersPanel({ data }: { data: ModelData }) {
    const context = useModelControlsContext();

    return (
        <div className="flex flex-col flex-wrap mt-2 justify-center items-center gap-4">
            <p className="flex flex-auto justify-center">Psychic Powers</p>
            {
                data.powers?.map((power, index) => {
                    return <PowerCard key={`${data.id}-${power.name}-${index}`} power={power} data={data} />
                })
            }
            <button className="flex justify-center w-8 h-8 mt-2 items-center" onClick={() => {
                const newPowers = [...data.powers || []];
                newPowers.push({ ...Powers[0] });
                context.updateModel(data.id, { ...data, powers: newPowers })
            }}>
                <FaPlusCircle className="text-xl" />
            </button>
        </div>
    )
}

const PowerCard = ({ power, data }: { power: PsychicPower, data: ModelData }) => {
    const context = useModelControlsContext();
    const availablePowers = Powers.filter((p) => {
        const id = p.id;
        const currentIds = data.powers?.map((p) => p.id) || []
        return currentIds?.indexOf(id) === -1 || p.id === power.id;
    })

    return (
        <div className="flex flex-col w-full rounded-md p-4 bg-stone-900">
            <div className="flex flex-row justify-between">
                <div className="flex flex-row space-x-2 items-center">
                    <Dropdown className="dark">
                        <DropdownTrigger>
                            <Button className="text-wrap w-32 min-h-fit">
                                {power.name}
                            </Button>
                        </DropdownTrigger>
                        <DropdownMenu items={availablePowers.toSorted()} onAction={(key) => {
                            const powerId = key.toString().split("|")[1];
                            const newPower = Powers.find((i) => i.id === powerId)

                            if (newPower) {
                                const p = { ...newPower }
                                const newPowers = [...data.powers || []];
                                const newIndex = newPowers.findIndex((p) => p === power);
                                if (newIndex < 0) {
                                    newPowers.push(p)
                                } else {
                                    newPowers[newIndex] = p;
                                }

                                context.updateModel(data.id, { ...data, powers: newPowers });
                            }
                        }}>
                            {(item) => (
                                <DropdownItem
                                    key={`${data.id}|${item.id}|${generateId()}`}
                                    description={`cost: ${item.cost}pt${item.cost > 1 ? "s" : ""}`}
                                >
                                    {item.name}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <p className="flex">{power.cost}pt{power.cost === 1 ? "" : "s"}</p>
                </div>
                <button className='flex bg-red-700 p-2 rounded-lg w-8 h-8 ml-4 justify-center' onClick={() => {
                    // Remove the power from the list of powers
                    const powerIndex = data.powers!.findIndex((p) => p === power);
                    if (powerIndex > -1) {
                        const newPowers = [...data.powers || []]
                        newPowers.splice(powerIndex, 1);
                        context.updateModel(data.id, { ...data, powers: newPowers });
                    }
                }}><FaRegTrashAlt /></button>
            </div >
            <p className="mt-4">{power.effect}</p>
        </div>
    )
}