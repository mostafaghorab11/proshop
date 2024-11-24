import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateProductApi } from '../../services/apiProducts';

export default function useUpdateProduct() {
  const queryClient = useQueryClient();
  const { mutate: updateProduct, isPending } = useMutation({
    mutationFn: (product) => updateProductApi(product),
    onSuccess: (product) => {
      toast.success('Product updated successfully');
      queryClient.invalidateQueries(['products', product._id]);
    },
    onError: (error) => {
      toast.error('Failed to update product' + error);
    },
  });
  return { updateProduct, isPending };
}
