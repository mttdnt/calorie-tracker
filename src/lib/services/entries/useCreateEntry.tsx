import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../contants/env';
import { ENTRIES } from '../../contants/queryKeys';
import { Entry } from '@/lib/types/api';

function useCreateEntry() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError, data } = useMutation({
    mutationFn: (dailyReqs: Omit<Entry, 'id'> & { user_id: string }) => {
      return axios.post(`${API_URL}/entries`, dailyReqs);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENTRIES] });
    },
  });

  return {
    createEntry: mutate,
    isCreateEntryPending: isPending,
    createEntryError: error,
    isCreateEntryError: isError,
    createEntryData: data,
  };
}

export default useCreateEntry;
