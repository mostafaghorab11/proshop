import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { deleteUserApi } from '../../services/apiUsers';

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: (id) => deleteUserApi(id),
    onSuccess: () => {
      toast.success('User deleted successfully');
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      toast.error('Failed to delete user' + error);
    },
  });
  return { deleteUser, isPending };
}
