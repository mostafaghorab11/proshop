import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import { useUser } from '../features/auth/useUser';

function PrivateRoute() {
  const { user, isPending } = useUser();
  if (isPending) {
    return <Loader />;
  }
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
