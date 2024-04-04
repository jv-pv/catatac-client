import { NavLink } from "react-router-dom";

const ProductCards = ({product}) => (
    <NavLink to={`/product/${product._id}`}>
      <article className='flex flex-col w-full hover:scale-105 transition-transform duration-300'>
        <img src={product.imageUrl} alt='test-card' className='object-contain rounded-t-sm' />
        <div className='flex justify-between w-full bg-gray-50 px-1 rounded-b-sm border border-black'>
          <span className='text-2xl'>{product.name}</span>
          <span className='text-2xl'>${product.price}</span>
        </div>
      </article>
    </NavLink>
  );

export default ProductCards;
