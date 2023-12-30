import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchOrder() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    if (!query) {
      return null;
    }
    e.preventDefault();
    navigate(`/order/${query}`);
    setQuery('');
  }

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="space-x-2 text-[12px] sm:text-[16px] md:text-[19px]"
    >
      <input
        type="text"
        placeholder="Enter the Order ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="duration:500 w-20 rounded-full bg-yellow-100 px-4 py-2 text-[15px] font-normal text-stone-700 transition-all focus:w-72 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2 sm:w-60"
      />
    </form>
  );
}

export default SearchOrder;
