import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetchProduct } from '../../services/apiProducts';

export const useProduct = () => {
  const { id: productId } = useParams();
  const { data: product, isPending } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    retry: false,
  });

  return { product, isPending };
};
