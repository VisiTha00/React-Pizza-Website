function Button({ children, disabled = false, type, onClick = null }) {
  const defaultClass =
    'duration-800 mt-4 rounded-full text-sm bg-yellow-400 font-bold uppercase tracking-wide text-stone-700 transition-all hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
  let className = '';
  if (type === 'small') {
    className = defaultClass + ' px-3 py-2 text-[14px]  hover:px-5 hover:py-4';
  } else if (type === 'secondary') {
    className =
      'duration-800 mt-4 text-sm rounded-full border-2 border-stone-400 hover:px-5 hover:py-4 px-3.5 py-2.5 text-[18px] font-bold uppercase tracking-wide text-stone-500 transition-all hover:bg-stone-400 hover:text-stone-700 focus:bg-stone-400 focus:outline-none focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-not-allowed';
  } else if (type === 'round') {
    className = defaultClass + ' px-3.5 py-2 rounded-full text-sm font-bold';
  } else if (type === 'smallWithoutHover') {
    className = defaultClass + ' px-3 py-2 text-[14px]';
  } else {
    className = defaultClass + ' px-4 py-3 text-[18px] hover:px-5 hover:py-4';
  }
  if (onClick) {
    return (
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    );
  }
  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
