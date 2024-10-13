import { ModelData } from "../lib/model";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Attribute, attributeMappings } from "../lib/attributes";
import { useMemo, useState } from "react";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useModelControlsContext } from "./editor";


export function AttributeCell({ name, choices, data }: { name: string, choices: Attribute[], data: ModelData }) {
    type attributeKeyType = keyof typeof data.attributes;

    const attributeKey = name as attributeKeyType;
    const attribute = data.attributes[attributeKey];

    const [selectedKeys, setSelectedKeys] = useState(new Set([`${data.id} - ${name} - ${attribute.level}`]));
    const [isOpen, setIsOpen] = useState(false);

    const selectedAttribute = useMemo(
        () => attribute.level,
        [selectedKeys]
    )

    const context = useModelControlsContext();

    return (
        <div className="flex flex-col md:min-w-32 p-2 grow md:grow-0">
            <p className="flex p-2 justify-center">{name}</p>
            <Dropdown
                className="dark"
                onOpenChange={setIsOpen}
            >
                <DropdownTrigger>
                    <Button className="flex flex-row justify-between pr-2">
                        <span>{selectedAttribute}</span><span>{isOpen ? <MdOutlineArrowDropUp /> : <MdOutlineArrowDropDown />}</span>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    title={name}
                    aria-label="Dynamic Actions"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    items={choices}
                    onSelectionChange={(keys) => {
                        const keyParts = keys.currentKey?.split("-");
                        const level = keyParts && keyParts[2];
                        const newModelData = { ...data };
                        const newAttr = attributeMappings
                            .find((a) => a.name === name)?.attributes
                            .find((a) => a.level === level);

                        if (newAttr) {
                            newModelData.attributes[attributeKey] = { ...newAttr };
                            context.updateModel(data.id, newModelData);
                        }

                        if (keys.currentKey) {
                            setSelectedKeys(new Set([keys.currentKey]))
                        }
                    }}
                >
                    {(item) => (
                        <DropdownItem key={`${data.id}-${name}-${item.level}`} description={`cost: ${item.cost}`}>{item.level}</DropdownItem>
                    )}
                </DropdownMenu>
            </Dropdown>
        </div >
    )
}

export function AttributeCells({ data }: { data: ModelData }) {
    return (
        <div className="flex md:flex-col flex-row flex-wrap bg-stone-900 rounded-md max-h-fit">
            {attributeMappings.map(({ name, attributes }) => {
                return <AttributeCell key={`${data.id}-${name}`} name={name} data={data} choices={attributes} />
            })}
        </div>
    )
}
