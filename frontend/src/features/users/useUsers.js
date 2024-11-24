import { useQuery } from '@tanstack/react-query';
import { getAllUsersApi } from '../../services/apiUsers';

export default function useUsers() {
  const { data: users, isPending } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsersApi,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return { users, isPending };
}
