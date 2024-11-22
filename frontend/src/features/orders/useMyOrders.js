import { useQuery } from '@tanstack/react-query';
import { getMyOrders } from '../../services/apiOrders';

export function useMyOrders() {
  const { data: myOrders, isPending } = useQuery({
    queryKey: ['myOrders'],
    queryFn: getMyOrders,
    retry: false,
  });

  return { myOrders, isPending };
}
