import { useState } from "react";
import { ModelData } from "../lib/model";
import { FaRegSave, FaPencilAlt } from "react-icons/fa";
import { AiOutlineCrown } from "react-icons/ai";
import { useModelControlsContext } from "./editor";
import { useDisclosure } from "@nextui-org/react";

export default function NameField({ data }: { data: ModelData }) {
    const [editMode, setEditMode] = useState(false);
    const [showEditbutton, setShowEditButton] = useState(false);
    const context = useModelControlsContext();
    const [name, setName] = useState(data.name);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const updateName = () => {
        context.updateModel(data.id, { ...data, name: name });
    }

    return (
        <div
            className="flex flex-row"
            onMouseEnter={() => setShowEditButton(true)}
            onMouseLeave={() => setShowEditButton(false)}
        >
            {
                !editMode ? <span>Name: {data.name} {data.isLeader ? "(leader)" : null}</span> :
                    <label className="flex">
                        Name:
                        <input
                            autoFocus={true}
                            className="ml-2"
                            spellCheck="false"
                            defaultValue={data.name}
                            onChange={event => setName(event.target.value)}
                            onKeyUp={(event) => {
                                if (event.key === "Enter" && name !== "") {
                                    setName(name);
                                    updateName();
                                    setEditMode(false);
                                }
                            }}
                        />
                    </label>
            }
            {(showEditbutton || editMode) && (
                <button
                    className="flex ml-2 items-center"
                    onClick={
                        () => {
                            updateName();
                            setEditMode(!editMode);
                        }
                    }
                >
                    {editMode ? <FaRegSave /> : <FaPencilAlt />}
                </button>
            )}
        </div>
    )
}