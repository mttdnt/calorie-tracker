'use client';

import {
  Input,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Spinner,
} from '@nextui-org/react';
import { FormEvent, useState } from 'react';
import useCreateEntry from '@/lib/services/entries/useCreateEntry';
import useGetUser from '@/lib/services/users/useGetUser';

export default function AddModal() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [entryName, setEntryName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const { createEntry, isCreateEntryError, createEntryError, isCreateEntryPending } =
    useCreateEntry();
  const { isGetUserPending, getUserError, isGetUserError, getUserData } = useGetUser();

  const updateDailyCount = (e: FormEvent) => {
    // Update daily count
    e.preventDefault();
    createEntry({
      name: entryName,
      user_id: getUserData['id'],
      calories: Number(calories),
      carbs: Number(carbs),
      protein: Number(protein),
      fat: Number(fat),
    });

    onClose();
  };

  if (isCreateEntryError) {
    throw createEntryError;
  }

  if (isGetUserError) {
    throw getUserError;
  }

  return (
    <>
      <Button onClick={onOpen}>Quick Add</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" placement="center">
        {isGetUserPending || isCreateEntryPending ? (
          <Spinner />
        ) : (
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1 capitalize">Add Meal</ModalHeader>
                <ModalBody>
                  <form id="add-form" onSubmit={updateDailyCount}>
                    <Input isRequired onChange={(e) => setEntryName(e.target.value)} label="Name" />
                    <Input
                      isRequired
                      className="mt-4"
                      type="number"
                      onChange={(e) => setCalories(e.target.value)}
                      label="Calories"
                    />
                    <Input
                      className="mt-4"
                      type="number"
                      onChange={(e) => setProtein(e.target.value)}
                      label="Protein"
                    />
                    <Input
                      className="mt-4"
                      type="number"
                      onChange={(e) => setCarbs(e.target.value)}
                      label="Carbs"
                    />
                    <Input
                      className="mt-4"
                      type="number"
                      onChange={(e) => setFat(e.target.value)}
                      label="Fat"
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button form="add-form" type="submit" color="primary">
                    Add
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
    </>
  );
}
