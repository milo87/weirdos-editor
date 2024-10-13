import { AttributeCells } from "./attributes";
import { calculateModelPoints } from "../lib/utils"
import NameField from "./name-field";
import { FaRegTrashAlt } from "react-icons/fa";
import { useMemo } from "react";
import WeaponSlots from "./weapon-slot";
import TraitSlots from "./trait-slot";
import { ModelData } from "../lib/model";
import { Warband } from "../lib/warband";
import { useModelControlsContext } from "./editor";
import EquipmentSlots from "./equipment-slot";
import PowersPanel from "./powers";


export default function ModelCard({ data, warbandData }: { data: ModelData, warbandData: Warband }) {
    const totalPoints = useMemo(
        () => calculateModelPoints(data, warbandData),
        [data, warbandData]
    )

    const context = useModelControlsContext();

    return (
        <div className="flex flex-col justify-around rounded bg-stone-800 p-5 shadow-2xl m-5 w-hvw gap-2">
            <div id="model-header" className="flex flex-row items-center mb-5">
                <div className="flex flex-row flex-grow items-start" >
                    <NameField data={data} />
                    <p className="flex ml-auto">Points: {totalPoints}</p>
                </div >
                {
                    !data.isLeader ? <button className='flex bg-red-700 p-2 rounded-lg w-8 h-8 ml-4 justify-center' onClick={() => { context.removeModel(data.id) }}><FaRegTrashAlt /></button> : null
                }
            </div>
            <div id="model-container" className="flex flex-col md:flex-row justify-center md:justify-start mb-5 gap-4">
                <AttributeCells data={data} />
                <div className="flex flex-col gap-8 grow">
                    <WeaponSlots data={data} />
                    <EquipmentSlots data={data} warbandData={warbandData} />
                </div>
            </div>
            <PowersPanel data={data} />
            {data.isLeader ? <TraitSlots warbandData={warbandData} /> : null}
        </div >
    )
}