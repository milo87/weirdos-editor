'use client';

import ModelCard from '@/app/ui/model-card'
import { ModelData } from '@/app/lib/model'
import { calculateModelPoints, createDefaultModel, modelDataReplacer, modelDataReviver } from '@/app/lib/utils'
import { useContext, createContext, useState, useMemo } from 'react';
import { FaRegSave, FaChessPawn, FaFolderOpen } from "react-icons/fa";
import { Warband } from '../lib/warband';
import { Trait, WarbandTraits } from '../lib/traits';

export type ModelControlsContextType = {
    "addModel": () => void
    "removeModel": (id: string) => void
    "updateModel": (id: string, data: ModelData) => void
    "updateLeaderTrait": (trait?: Trait) => void
    "updateWarbandTrait": (trait?: Trait) => void
    "dumpWarband": () => void
    "loadWarband": () => void
}

const ModelControlsContext = createContext<ModelControlsContextType>({
    "addModel": () => console.error("No addModel function provided"),
    "removeModel": (id: string) => console.log(`Cannot remove model with ID ${id}: No removeModel function provided`),
    "updateModel": (id: string) => console.log(`Cannot update model with ID ${id}: No updateModel function has been defined`),
    "updateLeaderTrait": () => console.log("No updateLeaderTrait functioned has been defined"),
    "updateWarbandTrait": () => console.log("No updateWarbandTrait function has been defined"),
    "dumpWarband": () => console.log("No dumpWarband function has been defined"),
    "loadWarband": () => "No loadWarband function has been defined",
});

export function useModelControlsContext() {
    return useContext(ModelControlsContext)
}

function AddModel() {
    const { addModel: add } = useModelControlsContext();
    return (
        <button
            className='flex items-center justify-center rounded bg-white p-4 text-xl text-stone-800'
            onClick={() => add()} >
            <FaChessPawn className='mr-2' /> Add Model
        </button>
    )
}

function Save() {
    const { dumpWarband: dump } = useModelControlsContext();
    return (
        <button
            className='flex items-center justify-center rounded bg-white p-4 text-xl text-stone-800' onClick={dump}>
            <FaRegSave className='mr-2' /> Save
        </button>
    )
}

function Load() {
    const { loadWarband: load } = useModelControlsContext();
    return (
        <button
            className='flex items-center justify-center rounded bg-white p-4 text-xl text-stone-800' onClick={load}>
            <FaFolderOpen className='mr-2' /> Load
        </button>
    )
}

function Controls() {
    return (
        <div className='flex flex-col gap-8'>
            <AddModel />
            <Save />
            <Load />
        </div>
    )
}

export default function Editor() {
    const [warbandData, setWarbandData] = useState<Warband>(() => {
        const wb = {
            name: "New Warband",
            models: new Map([
                ["leader", createDefaultModel(true)]
            ]),
            warbandTrait: WarbandTraits.find((trait) => trait.id === "soldiers")
        }
        return wb;
    });

    const addModel = () => {
        setWarbandData((oldWarbandData) => {
            let newModels = new Map(oldWarbandData?.models);
            let newModel = createDefaultModel();
            newModels.set(newModel.id, newModel);


            return { ...oldWarbandData, models: newModels };
        })
    }

    const removeModel = (id: string) => {
        setWarbandData((oldWarbandData) => {
            const newModels = new Map(oldWarbandData?.models)
            newModels.delete(id);

            return { ...oldWarbandData, models: newModels };
        })
    }

    const updateModel = (id: string, data: ModelData) => {
        setWarbandData((oldWarbandData) => {
            const newModels = new Map(oldWarbandData.models)
            newModels.set(id, data)

            return { ...oldWarbandData, models: newModels };
        })
    }

    const updateWarbandTrait = (trait?: Trait) => {
        setWarbandData((oldWarbandData) => {
            return { ...oldWarbandData, warbandTrait: trait }
        })
    }

    const updateLeaderTrait = (trait?: Trait) => {
        setWarbandData((oldWarbandData) => {
            return { ...oldWarbandData, leaderTrait: trait }
        })
    }

    const dumpWarband = () => {
        window.localStorage.setItem('warbandData', JSON.stringify(warbandData, modelDataReplacer));
    }

    const loadWarband = () => {
        const wb_json = localStorage.getItem("warbandData");

        if (wb_json) {
            const wb_data: Warband = JSON.parse(wb_json, modelDataReviver);
            setWarbandData(wb_data);
        }
    }

    const [modelArray, modelPoints] = useMemo(() => {
        let arr: ModelData[] = []
        let points = 0
        warbandData.models?.forEach((value: ModelData, _key: string) => {
            arr.push(value);
            points += calculateModelPoints(value, warbandData);
        })

        return [arr, points];
    }, [warbandData.models])

    return (
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">
            <div className='flex flex-col'>
                <ModelControlsContext.Provider value={{ addModel, removeModel, updateModel, updateWarbandTrait, updateLeaderTrait, dumpWarband, loadWarband }}>
                    <div className='flex flex-col gap-12 md:flex-row'>
                        <div className='flex flex-wrap justify-center'>
                            {
                                modelArray.map((modelData) => {
                                    return <ModelCard key={modelData.id} data={modelData} warbandData={warbandData} />
                                })
                            }
                        </div>
                        <Controls />
                    </div>
                </ModelControlsContext.Provider>
                <p className='flex flex-auto justify-center'>Total points: {modelPoints}</p>
            </div >
        </div >
    )
}