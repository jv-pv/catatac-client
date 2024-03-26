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
            console.log(response.data)
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
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={thisUser.email}
          onChange={handleTextChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={thisUser.password}
          onChange={handleTextChange}
        />

        <button type="submit">Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}

export default LoginPage;