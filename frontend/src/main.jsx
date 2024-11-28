import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import App from './App.jsx';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
const AdminRoute = lazy(() => import('./screens/AdminRoute.jsx'));
const CartScreen = lazy(() => import('./screens/CartScreen.jsx'));
const HomeScreen = lazy(() => import('./screens/HomeScreen.jsx'));
const LoginScreen = lazy(() => import('./screens/LoginScreen.jsx'));
const OrderScreen = lazy(() => import('./screens/OrderScreen.jsx'));
const PaymentScreen = lazy(() => import('./screens/PaymentScreen.jsx'));
const PlaceOrderScreen = lazy(() => import('./screens/PlaceOrderScreen.jsx'));
const PrivateRoute = lazy(() => import('./screens/PrivateRoute.jsx'));
const ProductScreen = lazy(() => import('./screens/ProductScreen.jsx'));
const ProfileScreen = lazy(() => import('./screens/ProfileScreen.jsx'));
const RegisterScreen = lazy(() => import('./screens/RegisterScreen.jsx'));
const ShippingScreen = lazy(() => import('./screens/ShippingScreen.jsx'));
const OrderListScreen = lazy(() =>
  import('./screens/admin/OrderListScreen.jsx')
);
const ProductEditScreen = lazy(() =>
  import('./screens/admin/ProductEditScreen.jsx')
);
const ProductListScreen = lazy(() =>
  import('./screens/admin/ProductListScreen.jsx')
);
const UserEditScreen = lazy(() => import('./screens/admin/UserEditScreen.jsx'));
const UserListScreen = lazy(() => import('./screens/admin/UserListScreen.jsx'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orders" element={<OrderListScreen />} />
        <Route path="/admin/products" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
        <Route path="/admin/users" element={<UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </HelmetProvider>
  </StrictMode>
);
