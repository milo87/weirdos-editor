import { ModelData } from "../lib/model"

export default function ModelCard({ data, removeButtonFunc }: { data: ModelData, removeButtonFunc: (id: string) => void }) {
    return (
        <div className="flex flex-col items-center justify-center rounded bg-stone-800 p-10 shadow-2xl">
            {
                !data.isLeader ? <button className='flex ' onClick={() => { removeButtonFunc(data.id) }}>X</button> : null
            }
            <div className="flex items-start">
                <p className="flex flex-col">Name: {data.name}</p>
            </div>
        </div >
    )
}