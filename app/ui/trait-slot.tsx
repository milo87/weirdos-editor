import { Warband } from "../lib/warband";

export default function TraitSlots({ warbandData }: { warbandData: Warband }) {
    return (
        <div className="flex w-max flex-col">
            <p>Leader Trait: {warbandData.leaderTrait?.name || "None"}</p>
            <p>Warband Trait: {warbandData.warbandTrait?.name}</p>
        </div>
    )
}