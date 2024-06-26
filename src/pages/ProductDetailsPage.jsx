import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { get, post } from "../services/authService";
import { AuthContext } from "../context/auth.context";

const ProductDetailsPage = ({fetchCartItems}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [buttonText, setButtonText] = useState("Add to Cart")

  const { isLoggedIn } = useContext(AuthContext);

  const { productId } = useParams();

  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      const response = await get(`/products/details/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      navigate(`/products/${productId}`);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleQuantityIncrement = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleQuantityDecrement = () => {
    setQuantity((prev) => {
      if (prev <= 1) {
        return prev;
      } else {
        return prev - 1;
      }
    });
  };

  const handleAddToCart = async () => {
    const productToAdd = {
      productId: productId,
      quantity: quantity,
    };

    try {
      const response = await post(`/cart/add`, productToAdd);
      console.log(response.data);
      setButtonText("Added!")
      setTimeout(() => {
        setButtonText("Add to Cart")
      }, 750);
      fetchCartItems()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className='details-grid text-black flex-1 font-headerFont'>
      <article className='image'>
        <div className='border-8 border-black'>
          <img
            src={selectedProduct?.imageUrl}
            alt=''
            className='w-full max-w-[500px] min-w-[400px]'
          />
        </div>
      </article>
      <article className='self-center justify-self-center max-w-96'>
        <div className='flex flex-col items-start justify-center gap-6 px-5 py-7 w-full h-full max-w-[400px] min-w-96 min-h-[250px] text-gray-800 bg-red-500 border-2 border-black rounded-sm'>
          <h2 className='text-2xl ml-2 underline'>{selectedProduct?.name}</h2>
          <div>
            <p className='ml-2'>{selectedProduct?.description}</p>
          </div>

          <div className='flex w-full mt-10'>
            <div className='flex justify-between'>
              <p className='text-lg inline-block ml-2'>${selectedProduct?.price}</p>
            </div>
          </div>
          <div className='flex w-full justify-between items-center'>
            <div className='flex w-20 justify-evenly'>
              <button onClick={handleQuantityDecrement}>
                <img src='/svg/minus-circle-black.svg' alt='' />
              </button>
              <p>{quantity}</p>
              <button onClick={handleQuantityIncrement}>
                <img src='/svg/plus-circle-black.svg' alt='' />
              </button>
            </div>
            {isLoggedIn ? (
              <button
                type='button'
                className='bg-black text-white w-32 h-10 self-end hover:text-red-500'
                onClick={handleAddToCart}
              >
                {buttonText}
              </button>
            ) : (
              <NavLink to='/login'>
                <button
                  type='button'
                  className='bg-black text-white w-32 h-10 self-end hover:text-red-500'
                >
                  Add to Cart
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </article>
      {/* <article className='reviews flex flex-col items-center w-full mt-5 bg-gratOpaque backdrop-blur-sm'>
        <h1 className='font-bold text-2xl'>Reviews</h1>
        <div className='flex flex-col w-full max-w-[500px] min-w-96 bg-orange-200 p-4 rounded-md'>
          <h1 className="font-bold">Great!</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus quibusdam
            cupiditate magnam nulla omnis.
          </p>
          <p className='italic self-end'>Name</p>
        </div>
      </article> */}
    </section>
  );
};

export default ProductDetailsPage;
