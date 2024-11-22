import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateProfile as updateProfileApi } from '../../services/apiAuth';

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: (user) => updateProfileApi(user),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['user'], updatedUser);
      toast.success('Profile updated successfully');
      queryClient.invalidateQueries(['user']);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateProfile, isPending };
}
