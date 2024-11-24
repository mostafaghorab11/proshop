import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { updateUserApi } from '../../services/apiUsers';

export default function useEditUser() {
  const queryClient = useQueryClient();
  const { mutate: editUser, isPending } = useMutation({
    mutationFn: (user) => updateUserApi(user),
    onSuccess: (user) => {
      toast.success('User updated successfully');
      queryClient.invalidateQueries(['users', user._id]);
    },
    onError: (error) => {
      toast.error('Failed to update user' + error);
    },
  });

  return { editUser, isPending };
}
