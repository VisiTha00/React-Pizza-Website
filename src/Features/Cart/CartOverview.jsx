import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  return (
    <div className="flex items-center justify-between bg-stone-700 bg-opacity-90 p-4 text-[14px] text-stone-100 sm:p-7 sm:text-[16px] md:p-9 md:text-[18px]">
      {!totalCartQuantity ? (
        <>
          <p>Choose your pizza as you want 🍕😋</p>
          <p>🛒Currently your cart is empty...</p>
        </>
      ) : (
        <>
          <p className="space-x-4 sm:space-x-8">
            <span>{totalCartQuantity} pizzas</span>
            <span>{formatCurrency(totalCartPrice)}</span>
          </p>
          <Link to="/cart">Open cart &rarr;</Link>
        </>
      )}
    </div>
  );
}

export default CartOverview;
