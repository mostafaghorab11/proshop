import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { createReviewApi } from '../../services/apiProducts';

export default function useCreateReview() {
  const queryClient = useQueryClient();
  const { id: productId } = useParams();
  const { mutate: createReview, isPending } = useMutation({
    mutationFn: (review) => createReviewApi(productId, review),
    onSuccess: () => {
      toast.success('Review created successfully');
      queryClient.invalidateQueries(['product', productId]);
    },
    onError: (error) => {
      toast.error('Failed to create review' + error);
    },
  });

  return { createReview, isPending };
}
