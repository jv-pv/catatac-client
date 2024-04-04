import { useContext, useEffect, useState } from "react";
import { axiosDelete, get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import UserDetailsCard from "../components/UserDetailCard";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [thisUser, setThisUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const fetchUser = async () => {
    try {
      const response = await get(`/users/profile/${user?._id}`);
      setThisUser(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await get(`/cart`);
      setCartItems(response?.data?.cart);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeItemFromCart = async (productId) => {
    try {
      const response = await axiosDelete(`/cart/remove/${productId}`);
      fetchCartItems();
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const shipping = cartItems.length > 0 ? 10 : 0;
    const grandTotal = subtotal + shipping;

    return { subtotal, shipping, grandTotal };
  };

  const { subtotal, shipping, grandTotal } = calculateTotals();

  return (
    <section className='grid grid-cols-2 flex-1 mt-36 mb-10 mx-7 font-headerFont'>
      <article className='flex flex-col justify-self-center self-start text-black font-headerFont'>
        <div>
          <UserDetailsCard thisUser={thisUser} />
        </div>
      </article>

      <article className='flex flex-col justify-self-center bg-gray-200 w-full h-auto max-w-[700px] max-h-[600px] border-2 border-black'>
        <div className='border-b-2 border-black flex items-center justify-center p-4 drp-shadow'>
          <h1 className='text-3xl text-black text-center'>Cart</h1>
        </div>
        {cartItems.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-black text-2xl font-headerFontBold'>Empty</p>
          </div>
        ) : (
          <article className=' flex flex-col gap-4 p-4 w-full h-full max-h-[600px] overflow-y-scroll'>
            <article className='flex flex-col gap-4 p-4 w-full h-full max-h-[600px] overflow-y-scroll'>
              {cartItems.map((item) => (
                <div key={item._id} className='flex border-2 border-black text-black rounded'>
                  <div className='flex-2'>
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className='w-36'
                    />
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
              ))}
            </article>
          </article>
        )}

        <article className='flex flex-col justify-center gap-1 bg-gray-200 text-black w-full h-40 pl-4'>
          <p className='word-spacing-tight'>Subtotal: ${subtotal}</p>
          <p className='word-spacing-tight'>Shipping: ${shipping}</p>
          <p className='word-spacing-tight'>Grand Total: ${grandTotal}</p>
        </article>
      </article>
    </section>
  );
};

export default CartPage;
