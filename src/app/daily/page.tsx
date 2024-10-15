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
import { useState } from 'react';
import { IDailyStats, RequirementField, UIRequirementField } from '@/lib/types/api';
import useGetUser from '@/lib/services/users/useGetUser';
import useUpdateUser from '@/lib/services/users/useUpdateUser';
import CenteredSpinner from '@/components/CenteredSpinner';

export default function Daily() {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [req, setReq] = useState<RequirementField>();
  const [selectedField, setSelectedField] = useState('');

  const { isGetUserPending, getUserError, isGetUserError, getUserData } = useGetUser();
  const { updateUser, isUpdateUserPending, isUpdateUserError, updateUserError } = useUpdateUser();

  const openModal = (field: RequirementField) => {
    setReq(field);
    onOpen();
  };

  const onModalClose = () => {
    setSelectedField('');
    onClose();
    setReq(undefined);
  };

  const onUpdateField = async () => {
    const currentRequirements: IDailyStats = {
      daily_calories: Number(getUserData['daily_calories']),
      daily_carbs: Number(getUserData['daily_carbs']),
      daily_protein: Number(getUserData['daily_protein']),
      daily_fat: Number(getUserData['daily_fat']),
    };
    updateUser({
      ...currentRequirements,
      id: getUserData['id'],
      [req || '']: Number(selectedField),
    });
    onModalClose();
  };

  if (isUpdateUserError) throw updateUserError;
  if (isGetUserError) throw getUserError;

  return (
    <main className="mx-auto mt-8 max-w-screen-lg px-4 lg:px-8">
      <h1 className="mb-4 text-center text-4xl lg:text-6xl">Daily Goals</h1>
      {isGetUserPending || isUpdateUserPending ? (
        <CenteredSpinner />
      ) : (
        <>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg lg:text-2xl">Calories {getUserData['daily_calories']}</p>
            <Button onPress={() => openModal('daily_calories')}>Update</Button>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg lg:text-2xl">Protein {getUserData['daily_protein']}</p>
            <Button onPress={() => openModal('daily_protein')}>Update</Button>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg lg:text-2xl">Carbs {getUserData['daily_carbs']}</p>
            <Button onPress={() => openModal('daily_carbs')}>Update</Button>
          </div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-lg lg:text-2xl">Fat {getUserData['daily_fat']}</p>
            <Button onPress={() => openModal('daily_fat')}>Update</Button>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" placement="center">
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1 capitalize">
                    Update {req && UIRequirementField[req]}
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      className="capitalize"
                      type="number"
                      onChange={(e) => setSelectedField(e.target.value)}
                      label={req && UIRequirementField[req]}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onModalClose}>
                      Close
                    </Button>
                    <Button color="primary" onPress={onUpdateField}>
                      Update
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </main>
  );
}
