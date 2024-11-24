import { useQuery } from '@tanstack/react-query';
import { getUserByIdApi } from '../../services/apiUsers';
import { useParams } from 'react-router-dom';

export default function useUserForAdmin() {
  const { id: userId } = useParams();
  const { data: user, isPending } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserByIdApi(userId),
    retry: false,
  });
  return { user, isPending };
}
