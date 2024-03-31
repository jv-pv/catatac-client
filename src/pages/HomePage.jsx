import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { get } from "../services/authService";

function HomePage() {
  const [products, setProducts] = useState([])
  const { isLoggedIn, user } = useContext(AuthContext);
  const fetchUsers = async () => {
    const authToken = localStorage.getItem("authToken");
    
    try {
      let response = await get("/products", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchUsers()
  },[])


  return (
    <div className="bg-gray-100 flex-1 text-black">
      <h1 className="text-black">Home Page</h1>

      <div>
        {products.map(product => (
          <div key={product._id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
