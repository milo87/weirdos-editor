import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Warband } from "../lib/warband";
import { Button } from "@nextui-org/react";
import { generateId } from "../lib/utils";
import { LeaderTraits, WarbandTraits } from "../lib/traits";
import { useModelControlsContext } from "./editor";

export enum TraitSlotType {
    LEADER = "Leader",
    WARBAND = "Warband"
}

export default function TraitSlots({ warbandData, }: { warbandData: Warband }) {
    return (
        <table className="border-collapse">
            <caption>Traits</caption>
            <thead>
                <tr>
                    <th scope="col" colSpan={2} className="w-1/4 p-2">Name</th>
                    <th scope="col">Notes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Leader</th>
                    <TraitSlot warbandData={warbandData} type={TraitSlotType.LEADER} />
                </tr>
                <tr>
                    <th scope="row">Warband</th>
                    <TraitSlot warbandData={warbandData} type={TraitSlotType.WARBAND} />
                </tr>
            </tbody>
        </table>
    )
}

function TraitSlot({ warbandData, type }: { warbandData: Warband, type: TraitSlotType }) {
    const traits = type === TraitSlotType.LEADER ? LeaderTraits : WarbandTraits
    const context = useModelControlsContext();

    return (
        <>
            <td className="p-4">
                <Dropdown className="dark">
                    <DropdownTrigger>
                        <Button className="text-wrap min-w-full min-h-fit">
                            {
                                type === TraitSlotType.LEADER
                                    ? warbandData.leaderTrait?.name
                                    || "None" : warbandData.warbandTrait?.name || "None"
                            }
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Dynamic Actions" items={traits} onAction={(key) => {
                        const traitId = key.toString().split("|")[1];
                        const newTrait = traits.find((t) => t.id === traitId);

                        if (newTrait) {
                            if (type === TraitSlotType.LEADER) {
                                context.updateLeaderTrait(newTrait);
                            }
                            else {
                                context.updateWarbandTrait(newTrait);
                            }
                        }
                    }}>
                        {(item) => (
                            <DropdownItem key={`warband|${item.id}|${generateId()}`}>
                                {item.name}
                            </DropdownItem>
                        )}
                    </DropdownMenu>
                </Dropdown>
            </td>
            <td className="px-4">
                {type === TraitSlotType.LEADER ? warbandData.leaderTrait?.description || "-" : warbandData.warbandTrait?.description || "-"}
            </td>
        </>
    )
}