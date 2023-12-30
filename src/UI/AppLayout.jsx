import { Outlet, useNavigation } from 'react-router-dom';
import Header from './Header';
import CartOverview from '../Features/Cart/CartOverview';
import Loader from './Loader';

function AppLayout() {
  const status = useNavigation();
  const isLoading = status.state;

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      <main className="w-screen overflow-y-auto overflow-x-hidden ">
        {isLoading === 'loading' ? <Loader /> : null}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
