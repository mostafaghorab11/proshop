import { useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/apiOrders';

export default function useOrder() {
  const { id: orderId } = useParams();
  const queryClient = useQueryClient();

  const { data: order, isPending } = useQuery({
    queryKey: ['order'],
    queryFn: () => getOrderById(orderId),
    // keep unused data for 5 seconds
    staleTime: 0,
    onSuccess: () => {
      // invalidate the cache for the order
      queryClient.invalidateQueries(['order']);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { order, isPending };
}
