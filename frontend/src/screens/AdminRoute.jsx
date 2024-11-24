import { Navigate, Outlet } from 'react-router-dom';
import Loader from '../components/Loader';
import { useUser } from '../features/auth/useUser';

function AdminRoute() {
  const { user, isPending } = useUser();
  if (isPending) {
    return <Loader />;
  }
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}

export default AdminRoute;
