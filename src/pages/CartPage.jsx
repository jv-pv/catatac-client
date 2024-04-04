import { useContext, useEffect, useState } from "react";
import { axiosDelete, get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import UserDetailsCard from "../components/UserDetailCard";
import CartProductCard from "../components/CartProductCard";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [thisUser, setThisUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const response = await get(`/cart`);
      setCartItems(response?.data?.cart);
      setIsLoading(false);
    } catch (error) {
      setThisUser(false);
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

    const shipping = cartItems.length > 0 ? 5 : 0;
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
        {isLoading ? (
          <article className='flex items-center justify-center h-full'>
            <img src='/svg/loading.svg' alt='' className='spin w-7' />
          </article>
        ) : cartItems.length < 1 ? (
          <article className='flex items-center justify-center h-full'>
            <p className='text-black text-2xl font-headerFontBold'>Empty</p>
          </article>
        ) : (
          <article className=' flex flex-col gap-4 p-4 w-full h-full max-h-[600px] overflow-y-scroll'>
            <div className='flex flex-col gap-4 p-4 w-full h-full max-h-[600px] overflow-y-scroll'>
              {cartItems.map((item) => (
                <CartProductCard
                  item={item}
                  removeItemFromCart={removeItemFromCart}
                  key={item._id}
                />
              ))}
            </div>
          </article>
        )}

        <article className='flex items-center justify-between bg-gray-200 text-black w-full h-40 pl-4'>
          <div>
            <p className='word-spacing-tight'>Subtotal: ${subtotal}</p>
            <p className='word-spacing-tight'>Shipping: ${shipping}</p>
            <p className='word-spacing-tight'>Grand Total: ${grandTotal}</p>
          </div>
          <div className='self-end pb-4 pr-4'>
            <button className='bg-black text-white w-24 p-1 hover:bg-red-500 hover:text-black transition-colors duration-300'>
              Checkout
            </button>
          </div>
        </article>
      </article>
    </section>
  );
};

export default CartPage;
