import { useQuery } from '@tanstack/react-query';
import { getAllOrdersAdmin } from '../../services/apiOrders';

export default function useOrders() {
  const { data: orders, isPending } = useQuery({
    queryKey: ['orders'],
    queryFn: getAllOrdersAdmin,
  });

  return { orders, isPending };
}
