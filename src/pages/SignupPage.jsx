import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";

function SignupPage(props) {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext)

  const navigate = useNavigate();

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    post("/auth/signup", newUser)
      .then((response) => {
        console.log(`This is the new user => ${response.data}`);
        storeToken(response.data.authToken)
        authenticateUser()
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        setNewUser({
          email: "",
          password: "",
          name: "",
        });
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleTextChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleTextChange}
        />

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleTextChange}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;