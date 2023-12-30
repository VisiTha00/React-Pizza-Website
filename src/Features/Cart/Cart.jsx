import { Link, useNavigate } from 'react-router-dom';
import Button from '../../UI/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './cartSlice';

function Cart() {
  const userName = useSelector((state) => state.user.userName);
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClearCart() {
    dispatch(clearCart());
  }

  return (
    <div
      className={`${
        cart.length > 3 ? ' h-max ' : ' h-full '
      }  relative bg-white bg-opacity-80 px-4 py-4 backdrop-blur-sm`}
    >
      {cart.length > 0 ? (
        <>
          <Link
            to="/menu"
            className="text-[18px] font-semibold text-blue-600 hover:text-blue-400"
          >
            <button className="px-8 pt-4">&larr; Back to menu</button>
          </Link>

          <h2 className="mt-8 px-8 text-2xl font-bold">
            Your cart, {userName}
          </h2>
          <ul className=" divide-y divide-stone-400 border-b border-stone-400 px-8">
            {cart.map((item) => (
              <CartItem item={item} key={item.pizzaId} />
            ))}
          </ul>

          <div className="mb-2 mt-10 flex items-center justify-center space-x-8 ">
            <Link to="/order/new">
              <Button type="primary">Order pizzas</Button>
            </Link>
            <Button type="secondary" onClick={handleClearCart}>
              Clear cart
            </Button>
          </div>
        </>
      ) : (
        <p className="font-stone-700 absolute inset-0 flex flex-col items-center justify-center text-2xl font-semibold">
          <span className="text-3xl">😥</span>
          <span className="mt-5">
            Your cart is currently empty. Go to menu and choose your pizza
          </span>
          <Button className="primary" onClick={() => navigate('/menu')}>
            Go to Menu
          </Button>
        </p>
      )}
    </div>
  );
}

export default Cart;
