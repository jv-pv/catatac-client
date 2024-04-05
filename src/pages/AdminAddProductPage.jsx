import { useState } from "react";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { fileChange } from "../services/imageUpload";
import AdminAddProductForm from "../components/AdminAddProductForm";

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
      <AdminAddProductForm newProduct={newProduct} handleAddSubmit={handleAddSubmit} handleFormChange={handleFormChange} handleImageUpload={handleImageUpload} disabled={disabled} addProductSuccessMsg={addProductSuccessMsg} addProductErrorMsg={addProductErrorMsg}/>
    </section>
  );
};

export default AdminAddProductPage;