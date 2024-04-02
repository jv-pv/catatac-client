import { NavLink } from "react-router-dom";

const ProductCards = ({product}) => (
    <NavLink to={`/product/${product._id}`}>
      <article className='flex flex-col w-full hover:scale-105 transition-transform duration-300 '>
        <img src={product.imageUrl} alt='test-card' className='object-contain' />
        <div className='flex justify-between w-full bg-gray-100 px-1'>
          <span className='text-2xl'>{product.name}</span>
          <span className='text-2xl'>${product.price}</span>
        </div>
      </article>
    </NavLink>
  );

export default ProductCards;
