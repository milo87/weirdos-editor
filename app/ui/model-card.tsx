import { ReactElement } from "react"
import { ModelData } from "../lib/model"
import { calculateModelPoints } from "../lib/utils"

function AttributeCell({ name, value }: { name: string, value: string }) {
    return (
        <div className="flex flex-col place-items-center items-center border-solid border-2 border-gray-900">
            <p className="flex grow justify-center p-2 bg-gray-900 text-gray-50">{name}</p>
            <p className="flex grow justify-center w-16 p-2 text-gray-900 bg-gray-50">{value}</p>
        </div>
    )
}

function AttributeCells({ data }: { data: ModelData }) {
    let attribute: keyof typeof data.attributes;

    let cells: ReactElement[] = []

    for (attribute in data.attributes) {
        cells.push(
            <AttributeCell key={`${data.id}-${attribute}`} name={attribute} value={data.attributes[attribute].level.toString()} />
        )
    }

    return (
        <div className="flex flex-row">
            {cells}
        </div>
    )
}

export default function ModelCard({ data, removeButtonFunc }: { data: ModelData, removeButtonFunc: (id: string) => void }) {
    return (
        <div className="flex flex-col items-center justify-center rounded bg-stone-800 p-5 shadow-2xl min-w-500 m-5">
            {
                !data.isLeader ? <button className='flex ml-auto' onClick={() => { removeButtonFunc(data.id) }}>X</button> : null
            }
            <div className="flex flex-row items-start mb-5">
                <p className="flex flex-col mr-10">Name: {data.name}</p>
                <p className="flex ml-auto">Points: {calculateModelPoints(data)}</p>
            </div>
            <AttributeCells data={data} />
        </div >
    )
}