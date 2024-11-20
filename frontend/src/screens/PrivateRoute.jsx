import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../features/auth/useUser';

function PrivateRoute() {
  const { user } = useUser();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
