import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';

import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const GroupChatModal = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <div>
            <span onClick={onOpen}>{children}</span>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input placeholder='First name' />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name' />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default GroupChatModal;
