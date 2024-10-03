import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react"

export default function LoadMenu() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <button onClick={onOpen}>Load</button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onclose) => (
                        <>
                            <ModalHeader>Load Warband</ModalHeader>
                            <ModalBody></ModalBody>
                            <ModalFooter></ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}