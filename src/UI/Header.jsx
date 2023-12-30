import { Link } from 'react-router-dom';
import SearchOrder from '../Features/Order/SearchOrder';
import Username from '../Features/User/Username';

function Header() {
  return (
    <header className="pX-10 flex items-center justify-between border-b border-stone-500 bg-opacity-70 bg-gradient-to-r from-amber-500 to-amber-200  px-8 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-stone-700  sm:py-8">
      <Link
        to="/"
        className="font-quicksand text-[20px] font-extrabold sm:text-[25px] md:text-[35px] "
      >
        Fast React Pizza Co.
      </Link>
      <div className="flex items-center justify-between space-x-6">
        <SearchOrder />
        <Username />
      </div>
    </header>
  );
}

export default Header;
