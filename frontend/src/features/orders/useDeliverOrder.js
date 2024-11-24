import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateOrderAsDelivered } from '../../services/apiOrders';
import { useParams } from 'react-router-dom';

export default function useDeliverOrder() {
  const { id: orderId } = useParams();
  const queryClient = useQueryClient();
  const { mutate: deliverOrder, isPending } = useMutation({
    mutationFn: () => updateOrderAsDelivered(orderId),
    onSuccess: (order) => {
      queryClient.setQueryData(['deliveredOrder', order._id], order);
      queryClient.invalidateQueries(['order']);
      toast.success('Order delivered successfully');
    },
    onError: (error) => {
      toast.error('Failed to deliver order' + error);
      console.log(error);
    },
  });

  return { deliverOrder, isPending };
}
