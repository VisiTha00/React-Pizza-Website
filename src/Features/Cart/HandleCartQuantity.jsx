import { useDispatch } from 'react-redux';
import Button from '../../UI/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function HandleCartQuantity({ pizzaId, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="space-x-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      <span className="text-sm font-bold">{quantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(pizzaId))}
      >
        +
      </Button>
    </div>
  );
}

export default HandleCartQuantity;
