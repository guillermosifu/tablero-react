import { Suspense, lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import { UserPage } from './pages/UserPage/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import { PrivateRouter } from './router/PrivateRouter';
import ProductsContext from '@pages/Products/context/ProductsContext';

// dinamic imports
const Attendance = lazy(() => import('./pages/Attendance/Attendance'))
const ListProducts = lazy(() => import('./pages/Products/ListProducts'))
const Product = lazy(() => import('./pages/Products/Product'))

// ----------------------------------------------------------------------

export default function Router () {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <PrivateRouter><DashboardLayout /></PrivateRouter>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'attendance', element: <Suspense fallback={null}><Attendance /></Suspense> }, // en ves de null, ir un loading
        {
          path: 'list', element:
            <ProductsContext>
              <Suspense fallback={null}><ListProducts /></Suspense>
            </ProductsContext>
        }, // en ves de null, ir un loading
        {
          path: 'list/new', element:
            <ProductsContext>
              <Suspense fallback={null}><Product /></Suspense>
            </ProductsContext>
        }, // en ves de null, ir un loading
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);

  return routes;
}
