import axios from 'axios';
import React, { useContext, useState } from 'react'
import { put } from '../services/authService';
import { ProductContext } from '../context/product.context';

const EditProductForm = ({product, setShowModal}) => {

  const {fetchProducts} = useContext(ProductContext)

  const [editedProduct, setEditedProduct] = useState({
    imageUrl: product.imageUrl,
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock
  })

  const [editSuccessMsg, setEditSuccessMsg] = useState(undefined)
  const [editErrorMsg, setEditErrorMsg] = useState(undefined)

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
     const response = await put(`/products/update/${product._id}`, editedProduct)
     setEditSuccessMsg(response.data.successMsg)
     fetchProducts()
     console.log(response.data)
    } catch (error) {
      setEditErrorMsg(error.response.data.errorMsg)  
      setEditedProduct({
        imageUrl: product.imageUrl,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock
      })   
    }
  } 

  return (
    <section className='text-black w-full flex felx-col items-start justify-center flex-1 mt-8 font-headerFont'>
      <div className='w-96 h-full bg-red-500 p-5'>
        <form onSubmit={handleEditSubmit} className='flex flex-col h-full'>
          <label htmlFor='image-url'>Image:</label>
          {/* <input type="file" name="" id="" /> */}
          <input
            type='text'
            name='imageUrl'
            id='image-url'
            value={editedProduct.imageUrl}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <label htmlFor='product-name'>Name:</label>
          <input
            type='text'
            name='name'
            id='product-name'
            value={editedProduct.name}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <label htmlFor='product-description'>Description:</label>
          <textarea
            type='text'
            name='description'
            id='product-description'
            value={editedProduct.description}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <label htmlFor='product-price'>Price:</label>
          <input
            type='number'
            name='price'
            id='product-price'
            value={editedProduct.price}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <label htmlFor='product-stock'>Stock:</label>
          <input
            type='number'
            name='stock'
            id='product-stock'
            value={editedProduct.stock}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <button type='submit' onClick={() => {
            setTimeout(() => {
              setShowModal(false)
            }, 1000);
          }} className='bg-orange-400 w-16 self-center mt-3'>
            Edit
          </button>
          {/* <button disabled={disabled} type='submit' className='bg-orange-400 w-16 self-center mt-3'>
            Add
          </button> */}
        </form>
        {editErrorMsg && <p className="text-center mt-3">{editErrorMsg}</p>}
        {editSuccessMsg && <p className="text-center mt-3">{editSuccessMsg}</p>}
      </div>
    </section>
  )
}

export default EditProductForm