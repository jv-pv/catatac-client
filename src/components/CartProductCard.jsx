
const CartProductCard = () => {
  return (
    <div className='flex border-2 border-black text-black rounded'>
      <div className='flex-2'>
        <img src='/images/tangle.jpg' alt='' className='w-36' />
      </div>
      <div className='flex flex-col flex-1 w-full p-2'>
        <h2>Name:</h2>
        <p>Quantity: 1</p>
        <p className='mt-auto'>Price: $10</p>
      </div>
    </div>
  );
};

export default CartProductCard;
