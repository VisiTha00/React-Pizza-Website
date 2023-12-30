import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './UI//Home.jsx';
import Menu from './Features/Menu/Menu.jsx';
import { loader as menuLoader } from './Features/Menu/Menu.jsx';
import Cart from './Features/Cart/Cart.jsx';
import CreateOrder, {
  action as createOrderAction,
} from './Features/Order/CreateOrder.jsx';
import Order, { loader as orderLoader } from './Features/Order/Order.jsx';
import { action as UpdateOrderAction } from './Features/Order/UpdateOrder.jsx';
import AppLayout from './UI/AppLayout.jsx';
import Error from './UI/Error.jsx';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrderAction,
        errorElement: <Error />,
      },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
        action: UpdateOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
