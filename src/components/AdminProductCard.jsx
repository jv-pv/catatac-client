import { useContext, useState } from "react";
import EditProduct from "./EditProduct";
import { axiosDelete } from "../services/authService";
import EditProductForm from "./EditProductForm";
import { ProductContext } from "../context/product.context";

const AdminProductCard = ({ product }) => {

    const [showModal, setShowModal] = useState(false)

    const { fetchProducts } = useContext(ProductContext)

    const handleProductDelete = async () => {
        try {
           await axiosDelete(`/products/delete/${product._id}`)
           fetchProducts()
        } catch (error) {
            console.error("Error deleting product")
            console.log(error.response.data)
        }
    }

    return (
      <div className='grid grid-cols-[minmax(300px,_1fr)_2fr] gap-x-4 bg-gray-300 text-white w-1/2 min-w-[800px] rounded-lg overflow-hidden'>
        <article className='w-full h-full'>
          <img src='/images/cover-img.jpg' alt='' className='h-full w-full object-cover rounded-l-lg' />
        </article>
  
        <article className='flex flex-col items-start justify-center gap-6 py-5 px-4 w-full h-full text-black'>
          <h2 className='text-2xl'>
            <span className='font-bold'>Name:</span> {product.name}
          </h2>
          <div>
            <h3 className='text-xl font-bold'>Description: </h3>
            <p>
              {product.description}
            </p>
          </div>
  
          <div className='flex w-full mt-auto'>
            <div>
              <p className='text-lg inline-block mr-5'>
                <span className='font-bold'>Price: </span>${product.price}
              </p>
              <p className='text-lg inline-block'>
                <span className='font-bold'>Stock: </span>{product.stock}
              </p>
            </div>
            <div className='flex items-center justify-end w-full pr-4 gap-3'>
              <button className="bg-blue-500 text-black w-8 h-8 rounded-full flex items-center justify-center" onClick={() => setShowModal(true)}>
                <img src='/page-edit.svg' alt='' className="w-5 h-5" />
              </button>
              <button className='bg-red-600 text-blue-50 rounded-full w-8 h-8' onClick={handleProductDelete}>X</button>
            </div>
          </div>
        </article>

        <EditProduct 
        showModal={showModal}
        closeModal={() => setShowModal(false)}
        >
        
        <EditProductForm
        product={product}
        setShowModal={setShowModal}
        />

        </EditProduct>
      </div>
    );
  };
  
  export default AdminProductCard;