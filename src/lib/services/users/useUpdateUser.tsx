import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../contants/env';
import { DAILY_REQUIREMENTS } from '../../contants/queryKeys';
import { IDailyStats } from '@/lib/types/api';

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError, data } = useMutation({
    mutationFn: (dailyReqs: IDailyStats & { id: string }) => {
      return axios.post(`${API_URL}/users/daily_requirements`, dailyReqs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [DAILY_REQUIREMENTS] });
    },
  });

  return {
    updateUser: mutate,
    isUpdateUserError: isError,
    isUpdateUserPending: isPending,
    updateUserError: error,
  };
}

export default useUpdateUser;
