import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../contants/env';
import { ENTRIES } from '../../contants/queryKeys';

function useDeleteEntries() {
  const queryClient = useQueryClient();

  const { mutate, isPending, error, isError, data } = useMutation({
    mutationFn: (id: number | undefined) => {
      if (id) return axios.delete(`${API_URL}/entries/${id}`);
      return axios.delete(`${API_URL}/entries`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ENTRIES] });
    },
  });

  return {
    deleteEntries: mutate,
    isDeleteEntriesPending: isPending,
    deleteEntriesError: error,
    isDeleteEntriesError: isError,
    deleteEntriesData: data,
  };
}

export default useDeleteEntries;
