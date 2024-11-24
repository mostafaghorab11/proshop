import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteProductApi } from '../../services/apiProducts';

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  const { mutate: deleteProduct, isPending } = useMutation({
    mutationFn: (id) => deleteProductApi(id),
    onSuccess: () => {
      toast.success('Product deleted successfully');
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      toast.error('Failed to delete product' + error);
    },
  });
  return { deleteProduct, isPending };
}
