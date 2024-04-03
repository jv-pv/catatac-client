import { useState } from "react";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { fileChange } from "../services/imageUpload";

const AdminAddProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const [image, setImage] = useState("")

  const [disabled, setDisabled] = useState(false)
  const [addProductErrorMsg, setAddProductErrorMsg] = useState(undefined);
  const [addProductSuccessMsg, setAddProductSuccessMsg] = useState(undefined);

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
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

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const priceToString = newProduct.price.toString();
    const stockToString = newProduct.stock.toString();

    const requestBody = {
      imageUrl: image,
      name: newProduct.name,
      description: newProduct.description,
      price: priceToString,
      stock: stockToString,
    };

    try {
      const response = await post("/products", requestBody);
      console.log(response.data.successMsg)
      setTimeout(() => {
        navigate("/admin/products/add");
      }, 1500);
      setAddProductSuccessMsg(response.data.successMsg)
    } catch (error) {
      setAddProductErrorMsg(error.response.data.errorMsg);
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
      });
    }
  };

  return (
    <section className='text-black w-full flex justify-center flex-1 mt-44 font-headerFont'>
      <div className='w-96 h-full bg-red-500 p-5 border-2 border-black rounded-md'>
        <form onSubmit={handleAddSubmit} className='flex flex-col h-full'>
          <label htmlFor='image-url'>Image:</label>
          {/* <input type="file" name="" id="" /> */}
          <input
            type='file'
            name='imageUrl'
            id='image-url'
            value={null}
            onChange={handleImageUpload}
            className='my-2 mx-0 px-2 rounded-sm'
            required
          />
          <label htmlFor='product-name'>Name:</label>
          <input
            type='text'
            name='name'
            id='product-name'
            value={newProduct.name}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
            required
          />
          <label htmlFor='product-description'>Description:</label>
          <textarea
            type='text'
            name='description'
            id='product-description'
            value={newProduct.description}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
            required
          />
          <label htmlFor='product-price'>Price:</label>
          <input
            type='number'
            name='price'
            id='product-price'
            value={newProduct.price}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
            required
          />
          <label htmlFor='product-stock'>Stock:</label>
          <input
            type='number'
            name='stock'
            id='product-stock'
            value={newProduct.stock}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
            required
          />
          {/* <button type='submit' className='mt-6 bg-orange-300 w-24 self-center p-1 rounded-sm hover:bg-gray-900 hover:text-white transition-colors duration-300'>
            Add
          </button> */}
          <button disabled={disabled} type='submit' className='mt-6 bg-orange-300 w-24 self-center p-1 rounded-sm hover:bg-gray-900 hover:text-white transition-colors duration-300'>
            Add
          </button>
        </form>
        {addProductErrorMsg && <p className="text-center mt-3">{addProductErrorMsg}</p>}
        {addProductSuccessMsg && <p className="text-center mt-3">{addProductSuccessMsg}</p>}
      </div>
    </section>
  );
};

export default AdminAddProductPage;
