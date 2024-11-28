import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import { fetchProducts } from '../../services/apiProducts';

export const useProducts = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = Number(queryParams.get('page')) || 1;
  const limit = Number(queryParams.get('limit')) || 10;
  const search = queryParams.get('search') || '';

  const { data, isPending } = useQuery({
    queryKey: ['products', page, search, limit],
    queryFn: () => fetchProducts(page, limit, search),
  });

  return { data, isPending };
};
