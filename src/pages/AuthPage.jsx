import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { post } from "../services/authService";

const AuthPage = () => {
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const [signUpErrorMsg, setSignUpErrorMsg] = useState(undefined);
  const [loginErrorMsg, setLoginErrorMsg] = useState(undefined);

  const navigate = useNavigate();

  const [newUserData, setNewUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [thisUserData, setThisUserData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setThisUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await post("/auth/signup", newUserData);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/");
    } catch (error) {
      setSignUpErrorMsg(error.response.data.message);
      setNewUserData({
        email: "",
        password: "",
        name: "",
      });
    }
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await post("/auth/login", thisUserData)
      storeToken(response.data.authToken)
      authenticateUser()
      navigate("/")
    } catch (error) {
      setLoginErrorMsg(error.response.data.error)
      thisUserData({
        email: "",
        password: ""
      })
    }
  }

  return (
    <div className='flex items-center flex-1 text-black'>
      <div className='SignupPage'>
        <h2>Don't have an acount? Sign Up!</h2>
        <div className='border-black border-2 bg-black text-white'>
          <form onSubmit={handleSignUpSubmit}>
            <label htmlFor='signup-email'>Email:</label>
            <input
              type='email'
              name='email'
              id='signup-email'
              value={newUserData.email}
              onChange={handleSignUpChange}
              autoComplete="new-email"
            />
            <label htmlFor='signup-password'>Password:</label>
            <input
              type='password'
              name='password'
              id='signup-password'
              value={newUserData.password}
              onChange={handleSignUpChange}
              autoComplete="new-password"
            />
            <label htmlFor='signup-name'>Full Name:</label>
            <input
              type='text'
              id='signup-name'
              name='name'
              value={newUserData.name}
              onChange={handleSignUpChange}
            />

            <button type='submit'>Sign Up</button>
          </form>
          {signUpErrorMsg && <p>{signUpErrorMsg}</p>}
        </div>
      </div>

      <div className='LoginPage'>
        <h2>Login</h2>
        <div className='border-2 border-black bg-black text-white'>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor='login-email'>Email:</label>
            <input
              type='email'
              name='email'
              id='login-email'
              value={thisUserData.email}
              onChange={handleLoginChange}
              autoComplete="current-email"
            />
            <label htmlFor='login-password'>Password:</label>
            <input
              type='password'
              name='password'
              id='login-password'
              value={thisUserData.password}
              onChange={handleLoginChange}
              autoComplete="current-password"
            />

            <button type='submit'>Sign Up</button>
          </form>
          {loginErrorMsg && <p>{loginErrorMsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
