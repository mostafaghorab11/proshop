import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { createOrder as createOrderApi } from '../../services/apiOrders';

const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createOrder, isPending } = useMutation({
    mutationFn: (order) => createOrderApi(order),
    onSuccess: (order) => {
      queryClient.setQueryData(['order', order._id], order);
      navigate(`/order/${order._id}`);
      toast.success('Order placed successfully');
    },
    onError: (error) => {
      toast.error('Failed to place order' + error);
      console.log(error);
    },
  });

  return { createOrder, isPending };
};

export default useCreateOrder;
