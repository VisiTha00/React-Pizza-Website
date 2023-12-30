import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="px-4 py-4">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold">
          <span>{quantity}&times;</span> {name}
          <p className="text-sm capitalize italic text-stone-500">
            {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
          </p>
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
