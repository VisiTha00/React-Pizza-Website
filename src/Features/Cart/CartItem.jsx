import { useDispatch } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import { deleteItem } from './cartSlice';
import DeleteButton from '../../UI/DeleteButton';
import HandleCartQuantity from './HandleCartQuantity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <li className=" py-3 pt-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="pt-4 text-[18px] font-bold">
            {quantity}&times; {name}
          </p>
        </div>

        <div className="flex items-center justify-between space-x-6">
          <p className="pt-4 font-bold">{formatCurrency(totalPrice)}</p>
          <HandleCartQuantity pizzaId={pizzaId} quantity={quantity} />
          <DeleteButton handleDeleteItem={handleDeleteItem} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;
