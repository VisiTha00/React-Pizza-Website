// Test ID: IIDSAT

import { useFetcher, useLoaderData, useNavigate } from 'react-router-dom';
import { getOrder } from '../../Services/apiRestaurant';
import OrderItem from './OrderItem';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import Button from '../../UI/Button';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const order = useLoaderData();
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') {
      fetcher.load('/menu');
    }
  }, [fetcher]);

  return (
    <div className="h-full h-max h-screen space-y-6 bg-white px-8 pt-5 opacity-90 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="px-2 text-xl font-semibold">Order Number {id} Status</h2>

        <div className="space-x-4">
          {priority && (
            <span className="rounded-full bg-red-600 px-4 py-2 text-sm font-bold uppercase text-white ">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold uppercase text-white">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-300 px-6 py-5">
        <p className="text-[17px] font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-[15px] font-semibold italic text-stone-600">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-400 border-b border-t border-stone-400">
        {cart.map((item) => (
          <OrderItem
            item={item}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher.data?.find((el) => el.id === item.pizzaId).ingredients ??
              []
            }
            key={item.id}
          />
        ))}
      </ul>

      <div className="space-x-2 space-y-2 bg-stone-300 px-6 py-5">
        <p className="px-2 text-[17px] font-medium">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-[17px] font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-[17px] font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      <div className="mt-0 flex flex-col items-center justify-center pb-2">
        <Button className="primary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
        {!priority ? <UpdateOrder order={order} /> : ''}
      </div>
    </div>
  );
}

async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
export { loader };
