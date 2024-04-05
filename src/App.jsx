import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./context/auth.context";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import AdminNav from "./components/AdminNav";
import AdminAddProductPage from "./pages/AdminAddProductPage";
import AdminManageProductPage from "./pages/AdminManageProductPage";
import AdminOrdersPage from "./pages/AdminOrdersPage"
import ProductDetailsPage from "./pages/ProductDetailsPage";
import UserNav from "./components/UserNav";
import UserProfilePage from "./pages/UserProfilePage";
import UserEditProfilePage from "./pages/UserEditProfilePage";
import ErrorPage from "./pages/ErrorPage";
import CartPage from "./pages/CartPage";
import { get } from "./services/authService";
import "./App.css";
import UserOrdersPage from "./pages/UserOrdersPage";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const fetchCartItems = async () => {
    try {
      setIsLoading(true);
      const response = await get(`/cart`);
      setCartItems(response?.data?.cart);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartItems()
  }, [])

  const { user } = useContext(AuthContext);

  // Outlet renders whatever the current nested route url path element is
  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/auth' />;
  };

  const LoggedInAdmin = () => {
    return getToken() && user?.role === "admin" ? <Outlet /> : <Navigate to='/auth' />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />;
  };

  return (
    <div className='flex flex-col bg-gray-100 text-white w-full min-h-dvh bg-doodle bg-repeat-y'>
      <Navbar cartItems={cartItems} />

      <Routes>
        <Route exact path='/' element={<HomePage />} />

        <Route element={<LoggedInAdmin />}>
          <Route path='/admin' element={<AdminNav />}>
            <Route path='products/add' element={<AdminAddProductPage />} />
            <Route path='products/manage' element={<AdminManageProductPage />} />
            <Route path='orders' element={<AdminOrdersPage />} />
          </Route>
        </Route>

        <Route element={<LoggedIn />}>
          <Route path='/user' element={<UserNav/>}>
            <Route path="profile/:userId" element={<UserProfilePage/> }/>
            <Route path="edit/:userId" element={<UserEditProfilePage/> }/>
            <Route path=":userId/orders" element={<UserOrdersPage/>}/>
            <Route path=":userId/cart" element={<CartPage cartItems={cartItems} isLoading={isLoading} fetchCartItems={fetchCartItems}/> } />
          </Route>
        </Route>
        <Route path='/product/:productId' element={<ProductDetailsPage fetchCartItems={fetchCartItems} />} />
        <Route path="*" element={<ErrorPage/>}/>


        <Route element={<NotLoggedIn />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/auth' element={<AuthPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
