import { useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../Services/apiRestaurant';
import store from '../../Store';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getTotalCartPrice } from '../Cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../User/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const error = useActionData();
  const {
    userName,
    status,
    position: geoPosition,
    address: personAddress,
    error: fetchError,
  } = useSelector((state) => state.user);
  const isLoading = status === 'loading';
  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  //basis is used get the content inline in a flexbox
  if (cart.length === 0) {
    return (
      <div className="font-stone-700 flex h-full  flex-col items-center justify-center bg-white bg-opacity-70 px-8 py-8 text-2xl font-semibold backdrop-blur-sm">
        <span className="text-3xl">😥</span>
        <span className="mt-5">
          Your cart is currently empty. Go to menu and choose your pizza
        </span>
        <Button className="primary" onClick={() => navigate('/menu')}>
          Go to Menu
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full bg-white bg-opacity-70 px-8 py-8 backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-stone-700">
        Ready to order? Let's go!
      </h2>

      <Form className="mt-8" method="POST">
        <div className="mb-5 flex flex-col sm:flex-row sm:items-center">
          <label className="text-[16px] font-semibold sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            required
            placeholder="First Name"
            defaultValue={userName}
            className="input grow text-[15px]"
          />
        </div>

        <div className="mb-5 flex flex-col  sm:flex-row sm:items-center">
          <label className="text-[16px] font-semibold sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input
              type="tel"
              name="phone"
              required
              placeholder="Phone Number"
              className="input w-full text-[15px]"
            />
            {error?.phone ? (
              <p className="mt-2 rounded-2xl bg-red-200 p-2 text-sm text-red-600">
                {error.phone}
              </p>
            ) : null}
          </div>
        </div>

        <div className="relative mb-5 flex  flex-col sm:flex-row sm:items-center">
          <label className="text-[16px] font-semibold sm:basis-40">
            Address
          </label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              placeholder="Address"
              defaultValue={personAddress}
              disabled={isLoading}
              className="input w-full text-[15px]"
            />
          </div>
          {geoPosition.latitude && geoPosition.longitude ? (
            ''
          ) : (
            <div className="absolute bottom-0.5 right-0.5">
              <Button
                type="smallWithoutHover"
                onClick={() => dispatch(fetchAddress())}
                disabled={isLoading}
              >
                Get the location
              </Button>
            </div>
          )}
        </div>

        <div className="mb-10 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-[16px] w-[16px] bg-yellow-100 accent-yellow-300 hover:bg-yellow-200 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="text-[16px] font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              geoPosition.latitude && geoPosition.longitude
                ? `${geoPosition.latitude},${geoPosition.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {' '}
            {isSubmitting
              ? 'Placing Order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true' ? true : false,
  };
  const error = {};
  if (!isValidPhone(newOrder.phone)) {
    error.phone = 'Invalid phone number';
  }
  if (Object.keys(error).length > 0) {
    return error;
  }
  const reponse = await createOrder(newOrder);
  store.dispatch(clearCart());
  return redirect(`/order/${reponse.id}`);
}

export default CreateOrder;
export { action };
