import { useState } from "react";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";

const AdminAddProductPage = () => {
  const [newProduct, setNewProduct] = useState({
    imageUrl: "",
    name: "",
    description: "",
    price: "",
    stock: "",
  });

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

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const imageUrl =
    newProduct.imageUrl.startsWith("http://") ||
    newProduct.imageUrl.startsWith("https://")
      ? newProduct.imageUrl
      : `https://${newProduct.imageUrl}`;

    const priceToString = newProduct.price.toString();
    const stockToString = newProduct.stock.toString();

    const requestBody = {
      imageUrl: imageUrl,
      name: newProduct.name,
      description: newProduct.description,
      price: `$${priceToString}`,
      stock: stockToString,
    };

    try {
      const request = await post("/products", requestBody);
      console.log(request.data.successMsg)
      setTimeout(() => {
        navigate("/admin/products/add");
      }, 1500);
      setAddProductSuccessMsg(request.data.successMsg)
    } catch (error) {
      setAddProductErrorMsg(error.response.data.message);
      setNewProduct({
        imageUrl: "",
        name: "",
        description: "",
        price: "",
        stock: "",
      });
    }
  };

  return (
    <section className='text-black w-full flex felx-col items-start justify-center flex-1 mt-8 font-headerFont'>
      <div className='w-80 h-full bg-red-500 p-5'>
        <form onSubmit={handleAddSubmit} className='flex flex-col h-full'>
          <label htmlFor='image-url'>Image:</label>
          {/* <input type="file" name="" id="" /> */}
          <input
            type='text'
            name='imageUrl'
            id='image-url'
            value={newProduct.imageUrl}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <label htmlFor='product-name'>Name:</label>
          <input
            type='text'
            name='name'
            id='product-name'
            value={newProduct.name}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <label htmlFor='product-description'>Description:</label>
          <textarea
            type='text'
            name='description'
            id='product-description'
            value={newProduct.description}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <label htmlFor='product-price'>Price:</label>
          <input
            type='number'
            name='price'
            id='product-price'
            value={newProduct.price}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <label htmlFor='product-stock'>Stock:</label>
          <input
            type='number'
            name='stock'
            id='product-stock'
            value={newProduct.stock}
            onChange={handleFormChange}
            className='my-2 mx-0 rounded-sm'
            required
          />
          <button type='submit' className='bg-orange-400 w-16 self-center mt-3'>
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