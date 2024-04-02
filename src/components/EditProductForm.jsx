import React, { useContext, useState } from 'react'
import { put } from '../services/authService';
import { ProductContext } from '../context/product.context';
import { fileChange } from '../services/imageUpload';

const EditProductForm = ({product, setShowModal}) => {

  const {fetchProducts} = useContext(ProductContext)

  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock
  })

  const [image, setImage] = useState("")
  const [disabled, setDisabled] = useState(false)



  const [editSuccessMsg, setEditSuccessMsg] = useState(undefined)
  const [editErrorMsg, setEditErrorMsg] = useState(undefined)

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    setDisabled(true)

    fileChange(e)
      .then(response => {
        setImage(response.data.image)
        setDisabled(false)
      })
      .catch(error => {
        console.log(error)
      }) 
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()

    const requestBody = {
      imageUrl: image,
      ...editedProduct
    }

    try {
     const response = await put(`/products/update/${product._id}`, requestBody)
     setEditSuccessMsg(response.data.successMsg)
     fetchProducts()
     console.log(response.data)
    } catch (error) {
      setEditErrorMsg(error.response.data.errorMsg)  
      setEditedProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock
      })   
    }
  } 

  return (
    <section className='text-black w-full flex felx-col items-start justify-center flex-1 mt-8 font-headerFont'>
      <div className='w-96 h-full bg-red-500 p-5 border-2 border-black'>
        <form onSubmit={handleEditSubmit} className='flex flex-col h-full'>
          <label htmlFor='image-url'>Image:</label>
          {/* <input type="file" name="" id="" /> */}
          <input
            type='file'
            name='imageUrl'
            id='image-url'
            onChange={handleImageUpload}
            className='my-2 mx-0 rounded-sm'
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
          <button type='submit' disabled={disabled} onClick={() => {
            setTimeout(() => {
              setShowModal(false)
            }, 1000);
          }} className='mt-6 bg-orange-300 w-24 self-center p-1 rounded-sm hover:bg-gray-900 hover:text-white transition-colors duration-300'>
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