import { useSelector } from 'react-redux';

function Username() {
  const user = useSelector((state) => state.user);
  const userName = user.userName;
  return (
    <div className="hidden text-[15px] capitalize md:block">{userName}</div>
  );
}

export default Username;
