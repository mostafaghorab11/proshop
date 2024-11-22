import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { updateOrderAsPaid } from '../../services/apiOrders';

export default function usePayOrder() {
  const { id: orderId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: payOrder, isPending } = useMutation({
    mutationFn: ({ details }) => updateOrderAsPaid({ orderId, details }),
    onSuccess: (order) => {
      queryClient.setQueryData(['paidOrder', order._id], order);
      queryClient.invalidateQueries(['order']);
      toast.success('Order paid successfully');
    },
    onError: (error) => {
      toast.error('Payment failed, ' + error);
    },
  });

  return { payOrder, isPending };
}
