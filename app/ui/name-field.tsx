import { ChangeEvent, useState } from "react";
import { ModelData } from "../lib/model";
import { FaRegSave, FaPencilAlt } from "react-icons/fa";
import { useModelControlsContext } from "./editor";

export default function NameField({ data }: { data: ModelData }) {
    const [editMode, setEditMode] = useState(false);
    const [showEditbutton, setShowEditButton] = useState(false);
    const context = useModelControlsContext();

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        let newModelData: ModelData = new ModelData(data);
        newModelData.name = event.target.value;
        context.updateModel(newModelData.id, newModelData);
    }

    return (
        <div className="flex flex-row" onMouseEnter={() => setShowEditButton(true)} onMouseLeave={() => setShowEditButton(false)}>
            {!editMode ? <p>Name: {data.name}</p> : <label className="flex">
                Name:
                <input className="ml-2" spellCheck="false" defaultValue={data.name} onInput={handleClick}></input>
            </label>}
            {(showEditbutton || editMode) && (
                <button className="flex ml-2 items-center" onClick={() => { setEditMode(!editMode) }}>{editMode ? <FaRegSave /> : <FaPencilAlt />}</button>
            )}
        </div>
    )

}