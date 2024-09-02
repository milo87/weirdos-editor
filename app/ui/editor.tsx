'use client';

import ModelCard from '@/app/ui/model-card'
import { ModelData } from '@/app/lib/model'
import { generateName, generateId } from '@/app/lib/utils'
import { useContext, createContext, useState } from 'react';


const ModelControlsContext = createContext<[() => void, (id: string) => void]>([
    () => console.log("No add model function provided."),
    () => console.log("No remove model function provided."),
]);

function useModelControlsContext() {
    return useContext(ModelControlsContext)
}

function AddModel() {
    const [add] = useModelControlsContext();
    return (
        <button
            className='flex items-center justify-center rounded bg-white p-4 text-xl text-stone-800'
            onClick={() => add()}>
            Add Model
        </button>
    )
}

function Controls() {
    return (
        <div className='flex flex-col gap-8'>
            <AddModel />
        </div>
    )
}

export default function Editor() {
    let initialModels: Map<string, ModelData> = new Map<string, ModelData>([
        ["00000000", {
            name: "Leader",
            id: "leader",
            isLeader: true
        }]
    ])

    const [models, setModel] = useState<Map<string, ModelData>>(initialModels);

    const addModel = () => {
        const name = generateName();
        const id = generateId();
        setModel((oldModels) => {
            var newModels = new Map(oldModels)
            newModels.set(id, { name: name, id: id, isLeader: false })
            return newModels
        })
    }

    const removeModel = (id: string) => {
        setModel((oldModels) => {
            if (oldModels.get(id)?.isLeader) {
                return oldModels
            }

            const newModels = new Map(oldModels)
            newModels.delete(id);
            return newModels
        })
    }

    const modelArray: Array<ModelData> = []

    models.forEach((value, _) => {
        modelArray.push(value);
    })

    return (
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
            <ModelControlsContext.Provider
                value={[addModel, removeModel]}>
                <div className='flex flex-row gap-12'>
                    <div className='grid auto-rows-auto grid-cols-3 gap-10'>
                        {
                            modelArray.map((modelData) => {
                                return <ModelCard key={modelData.id} data={modelData} removeButtonFunc={removeModel} />
                            })
                        }
                    </div>
                    <Controls />
                </div>
            </ModelControlsContext.Provider>
        </div>
    )
}