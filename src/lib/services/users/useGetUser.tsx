import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_URL } from '../../contants/env';
import { DAILY_REQUIREMENTS } from '../../contants/queryKeys';

function useGetUser() {
  const { isPending, error, isError, data } = useQuery({
    queryKey: [DAILY_REQUIREMENTS],
    queryFn: () =>
      axios.get(`${API_URL}/users`).then((res) => {
        return res.data;
      }),
  });

  return {
    isGetUserPending: isPending,
    getUserError: error,
    isGetUserError: isError,
    getUserData: data,
  };
}

export default useGetUser;
