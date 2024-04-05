const CartProductCard = ({ item, removeItemFromCart }) => {
  return (
    <div className='flex border-2 border-black text-black rounded'>
      <div className='flex-2'>
        <img src={item.product.imageUrl} alt={item.product.name} className='w-36' />
      </div>
      <div className='flex flex-col flex-1 w-full p-2'>
        <h2>Name: {item.product.name}</h2>
        <p>Quantity: {item.quantity}</p>
        <div className='flex items-center justify-between mt-auto'>
          <p>Price: ${item.product.price}</p>
          <button onClick={() => removeItemFromCart(item.product._id)}>X</button>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
