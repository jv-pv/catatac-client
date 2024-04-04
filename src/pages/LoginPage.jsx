import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";

function LoginPage(props) {
  const [thisUser, setThisUser] = useState({
      email: "",
      password: ""
    })

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)
  
  const navigate = useNavigate();

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setThisUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  
  const handleLoginSubmit = (e) => {
    e.preventDefault()

    post("/auth/login", thisUser)
        .then((response) => {
            console.log("Login response ==>", response.data)
            storeToken(response.data.authToken)
            authenticateUser()
            navigate("/")
        })
        .catch((error) => {
            const errorDescription = error.response.data.message
            setErrorMessage(errorDescription)
        })
  };
  
  return (
    <section className="w-80 bg-gray-100 border-black border-2 mx-auto mt-56 font-headerFont rounded-sm">
      <h1 className="text-xl text-center py-2 text-black">Please Login</h1>
      <div className="bg-gray-900 p-10 text-red-500">

      <form onSubmit={handleLoginSubmit} className="flex flex-col">
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={thisUser.email}
          onChange={handleTextChange}
          autoComplete="current-email"
          className="my-2 mx-0 px-1 rounded-sm"
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={thisUser.password}
          onChange={handleTextChange}
          autoComplete="current-password"
          className="my-2 mx-0 px-1 rounded-sm"
          required
        />

        <button type="submit" className="mt-7 bg-white w-24 self-center p-1 hover:bg-red-500 hover:text-white transition-colors duration-300">Login</button>
      </form>
      { errorMessage && <p className="error-message pt-9">{errorMessage}</p> }


      </div>

      <p className="text-black text-center mt-2">Don't have an account yet?</p>
      <Link to={"/auth"}><p className="text-center mb-2 underline hover:italic">Sign Up</p></Link>
    </section>
  )
}

export default LoginPage;