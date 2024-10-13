'use client';

import ModelCard from '@/app/ui/model-card'
import { ModelData } from '@/app/lib/model'
import { calculateModelPoints, createDefaultModel, modelDataReplacer, modelDataReviver } from '@/app/lib/utils'
import { useContext, createContext, useState, useMemo } from 'react';
import { FaRegSave, FaChessPawn, FaFolderOpen } from "react-icons/fa";
import { Warband } from '../lib/warband';
import { Trait, WarbandTraits } from '../lib/traits';
import { Button } from '@nextui-org/react';

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
    const { addModel } = useModelControlsContext();
    return (
        <Button
            className='grow'
            onClick={addModel}
            startContent={<FaChessPawn />}
        >
            Add Model
        </Button>
    )
}

function Save() {
    const { dumpWarband } = useModelControlsContext();
    return (
        <Button
            className='grow'
            onClick={dumpWarband}
            startContent={<FaRegSave />}>
            Save
        </Button>
    )
}

function Load() {
    const { loadWarband } = useModelControlsContext();
    return (
        <Button
            className='grow'
            onClick={loadWarband}
            startContent={<FaFolderOpen />}>
            Load
        </Button>
    )
}

function Controls({ totalPoints }: { totalPoints: number }) {
    return (
        <nav className="flex z-50 top-0 lg:top-10 sticky flex-col items-center w-full lg:max-w-44 p-4 bg-stone-800 rounded-b-md md:rounded-md shadow-zinc-950 shadow-lg
        ">
            <div className='flex gap-2 flex-wrap justify-center'>
                <AddModel />
                <Save />
                <Load />
            </div>
            <div className="flex flex-col flex-wrap">
                <p className="flex-auto text-wrap text-center mt-4">Warband points: {totalPoints}</p>
            </div>
        </nav>
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

    const [modelArray, totalPoints] = useMemo(() => {
        let arr: ModelData[] = []
        let points = 0
        warbandData.models?.forEach((value: ModelData, _key: string) => {
            arr.push(value);
            points += calculateModelPoints(value, warbandData);
        })

        return [arr, points];
    }, [warbandData])

    const contextValue = { addModel, removeModel, updateModel, updateWarbandTrait, updateLeaderTrait, dumpWarband, loadWarband };

    return (
        <ModelControlsContext.Provider value={contextValue}>
            <div id="main-ui" className='lg:flex flex-row items-baseline gap-12 h-auto'>
                <Controls totalPoints={totalPoints} />
                <main className='flex-wrap'>
                    {
                        modelArray.map((modelData) => {
                            return <ModelCard key={modelData.id} data={modelData} warbandData={warbandData} />
                        })
                    }
                </main>
            </div>
        </ModelControlsContext.Provider>
    )
}