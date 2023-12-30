import { useState } from 'react';
import Button from '../../UI/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) {
      return null;
    }
    dispatch(updateUser(username));
    navigate('/menu');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 text-[18px] font-semibold sm:text-[22px] md:text-[23px]"
    >
      <p className="text-yellow-400">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-50 mt-4 rounded-full bg-yellow-100 px-4 py-2 text-[15px] font-normal transition-all  duration-500 focus:w-72 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2  sm:w-72 sm:text-[16px] md:text-[18px] "
      />

      {username !== '' && (
        <div>
          <Button type="primary">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
