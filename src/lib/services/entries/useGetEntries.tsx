import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../contants/env';
import { ENTRIES } from '../../contants/queryKeys';

function useGetEntries() {
  const { isPending, error, isError, data } = useQuery({
    queryKey: [ENTRIES],
    queryFn: () =>
      axios.get(`${API_URL}/entries`).then((res) => {
        return res.data;
      }),
  });

  return {
    isGetEntriesPending: isPending,
    getEntriesError: error,
    isGetEntriesError: isError,
    getEntriesData: data,
  };
}

export default useGetEntries;
