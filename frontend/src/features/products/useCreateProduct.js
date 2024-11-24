import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { createProductApi } from '../../services/apiProducts';

export default function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: () => createProductApi(),
    onSuccess: () => {
      toast.success('Product created successfully');
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      toast.error('Failed to create product' + error);
    },
  });
  return { createProduct, isPending };
}
