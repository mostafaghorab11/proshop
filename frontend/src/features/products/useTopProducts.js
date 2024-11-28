import { useQuery } from '@tanstack/react-query';
import { getTopProductsApi } from '../../services/apiProducts';

export default function useTopProducts() {
  const { data: topProducts, isPending } = useQuery({
    queryKey: ['topProducts'],
    queryFn: getTopProductsApi,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  return { topProducts, isPending };
}
