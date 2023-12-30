import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../Services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <div className="h-max bg-white bg-opacity-80  backdrop-blur-sm">
      <ul className="  divide-y divide-stone-500 ">
        {menu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
}

async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
export { loader };
