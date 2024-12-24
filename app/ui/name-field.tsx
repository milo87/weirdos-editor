import { useState } from "react";
import { ModelData } from "../lib/model";
import { AiOutlineCrown } from "react-icons/ai";
import { useModelControlsContext } from "./editor";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

export default function NameField({ data }: { data: ModelData }) {
    const context = useModelControlsContext();
    const [name, setName] = useState(data.name);

    const { isOpen, onOpen, onClose } = useDisclosure({
        onClose: () => {
            context.updateModel(data.id, { ...data, name: name });
        }
    });

    return (
        <div className="flex flex-row">
            <label>Name: <Button onPress={onOpen} endContent={data.isLeader ? <AiOutlineCrown /> : null}>{data.name}</Button></label>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                backdrop="blur"
                className="dark"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader>Name</ModalHeader>
                            <ModalBody>
                                <Input
                                    autoFocus
                                    autoCorrect="false"
                                    type="text"
                                    label="name"
                                    placeholder="Enter name"
                                    value={name}
                                    onValueChange={setName}
                                    variant="bordered"
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button onPress={onClose}>Save</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}