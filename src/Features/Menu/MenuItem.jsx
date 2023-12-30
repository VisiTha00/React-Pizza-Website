import { useDispatch, useSelector } from 'react-redux';
import Button from '../../UI/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, deleteItem } from '../Cart/cartSlice';
import DeleteButton from '../../UI/DeleteButton';
import HandleCartQuantity from '../Cart/HandleCartQuantity';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const isInTheCart = useSelector((state) =>
    state.cart.cart.find((item) => item.pizzaId === id),
  );

  function addCartItems() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    };
    dispatch(addItem(newItem));
  }

  function handleDeleteItem() {
    dispatch(deleteItem(id));
  }

  return (
    <li
      className={`flex space-x-4 px-10 pb-4 pt-4 hover:${
        soldOut ? '' : 'bg-yellow-50'
      } hover:${soldOut ? '' : 'px-12 py-4 transition-all duration-300'} ${
        soldOut ? 'opacity-70 grayscale' : ''
      }`}
    >
      <img src={imageUrl} alt={name} className="h-[110px]" />
      <div className="flex grow flex-col">
        <p className="text-[19px] font-semibold">{name}</p>
        <p className="text-[17px] capitalize italic text-stone-600">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-[17px]">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className=" text-[17px] font-bold text-stone-500">Sold out</p>
          )}
          {soldOut ? (
            ''
          ) : (
            <>
              {isInTheCart ? (
                <div className="flex items-center space-x-4 pb-4">
                  <HandleCartQuantity
                    pizzaId={id}
                    quantity={isInTheCart.quantity}
                  />
                  <DeleteButton handleDeleteItem={handleDeleteItem} />
                </div>
              ) : (
                <Button
                  type="small"
                  onClick={addCartItems}
                  disabled={soldOut ? true : false}
                >
                  Add to cart
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
