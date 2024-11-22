import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getPayPalClientId } from '../../services/apiOrders';

export default function usePayPalClientId() {
  const queryClient = useQueryClient();
  const { data: clientId, isPending } = useQuery({
    queryKey: ['clientId'],
    queryFn: () => getPayPalClientId(),
    onSuccess: (clientId) => {
      queryClient.setQueryData(['clientId'], clientId);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { clientId, isPending };
}
