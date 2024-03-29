import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { useContext } from "react";


function HomePage() {

  const { isLoggedIn, user } = useContext(AuthContext)


  const fetchUser = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:4000/users', {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      {isLoggedIn && user && (
        <button className="bg-red-400 text-white" onClick={fetchUser}>
          Click
        </button>
      )}
    </div>
  );
}

export default HomePage;