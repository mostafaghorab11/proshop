import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../../services/apiProducts';

export const useProducts = () => {
  const { data: products, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return { products, isPending };
};
