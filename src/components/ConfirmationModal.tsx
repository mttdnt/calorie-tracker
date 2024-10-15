'use client';

import {
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Spinner,
} from '@nextui-org/react';

interface IConfirmationModal {
  confirmCallback: () => void;
  text: string;
  body: string;
}

export default function ConfirmationModal({ confirmCallback, text, body }: IConfirmationModal) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const confirm = () => {
    confirmCallback();
    onClose();
  };

  return (
    <>
      <Button color="danger" onClick={onOpen}>
        {text}
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" placement="center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
              <ModalBody>{body}</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={confirm}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
