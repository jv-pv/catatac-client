import { useState, useContext } from "react";
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
      setLoginErrorMsg(error.response.data.message)
      thisUserData({
        email: "",
        password: ""
      })
    }
  }

  return (
    <section className="flex justify-evenly items-center flex-1 text-black font-headerFont">
      <article className="w-80 bg-gray-100 border-black border-2">
        <h1 className="text-center border-black border-b-2 py-2">Don't have an acount? Sign Up!</h1>
        <div className='bg-red-500 p-8'>
          <form onSubmit={handleSignUpSubmit} className="flex flex-col">
            <label htmlFor='signup-email'>Email:</label>
            <input
              type='email'
              name='email'
              id='signup-email'
              value={newUserData.email}
              onChange={handleSignUpChange}
              autoComplete="new-email"
              className="my-2 mx-0 px-1 rounded-sm"
              required
            />
            <label htmlFor='signup-password'>Password:</label>
            <input
              type='password'
              name='password'
              id='signup-password'
              value={newUserData.password}
              onChange={handleSignUpChange}
              autoComplete="new-password"
              className="my-2 mx-0 px-1 rounded-sm"
              required
            />
            <label htmlFor='signup-name'>Full Name:</label>
            <input
              type='text'
              id='signup-name'
              name='name'
              value={newUserData.name}
              onChange={handleSignUpChange}
              className="my-2 mx-0 px-1 rounded-sm"
              required
            />

            <button type='submit' className="mt-6 bg-white w-24 self-center p-1 hover:bg-gray-900 hover:text-white transition-colors duration-300">Sign Up</button>
          </form>
          {signUpErrorMsg && <p className="pt-6">{signUpErrorMsg}</p>}
        </div>
      </article>

      <article className='w-80 bg-gray-100 border-black border-2'>
        <h1 className="text-center py-2">Have an account? Login!</h1>
        <div className='bg-gray-900 p-10 text-red-500 group'>
          <form onSubmit={handleLoginSubmit} className="flex flex-col">
            <label htmlFor='login-email'>Email:</label>
            <input
              type='email'
              name='email'
              id='login-email'
              value={thisUserData.email}
              onChange={handleLoginChange}
              autoComplete="current-email"
              className="my-2 mx-0 px-1 rounded-sm"
              required
            />
            <label htmlFor='login-password'>Password:</label>
            <input
              type='password'
              name='password'
              id='login-password'
              value={thisUserData.password}
              onChange={handleLoginChange}
              autoComplete="current-password"
              className="my-2 mx-0 px-1 rounded-sm"
              required
            />

            <button type='submit' className="mt-6 bg-white w-24 self-center p-1 hover:bg-red-500 hover:text-white transition-colors duration-300">Login</button>
          </form>
          {loginErrorMsg && <p className="text-white pt-8">{loginErrorMsg}</p>}
        </div>
      </article>
    </section>
  );
};

export default AuthPage;
