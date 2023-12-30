import { useSelector } from 'react-redux';
import CreateUser from '../Features/User/CreateUser';
import Button from './Button';
import { Link } from 'react-router-dom';

function Home() {
  const userName = useSelector((state) => state.user.userName);

  return (
    <div className=" py-10 text-center sm:py-16">
      <h1 className=" font-outline-2 font-outline-stone-700 text-[20px] font-bold text-yellow-500 sm:text-[24px] md:text-[36px]">
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>
      {userName === '' ? (
        <CreateUser />
      ) : (
        <div className="py-20">
          <Link to="/menu">
            <Button>Continue Ordering, {userName}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;
