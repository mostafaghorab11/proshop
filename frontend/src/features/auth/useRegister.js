import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { register as signupAPi } from '../../services/apiAuth';

export default function useRegister() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // check where to go after logging in
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get('redirect') || '/';

  const { mutate: register, isPending } = useMutation({
    mutationFn: (credentials) => signupAPi(credentials),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user);
      navigate(redirect, { replace: true });
      toast.success('Signup successful.');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Signup failed.');
    },
  });

  return { register, isPending };
}
