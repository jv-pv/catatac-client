import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./pages/LoginPage";
import AdminNav from "./components/AdminNav";
import AdminAddProductPage from "./pages/AdminAddProductPage";
import AdminManageProductPage from "./pages/AdminManageProductPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import UserNav from "./components/UserNav";
import UserProfilePage from "./pages/UserProfilePage";
import UserEditProfilePage from "./pages/UserEditProfilePage";
import UserReviewsPage from "./pages/UserReviewsPage";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const { user } = useContext(AuthContext);

  // Outlet renders whatever the current nested route url path element is
  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />;
  };

  const LoggedInAdmin = () => {
    return getToken() && user?.role === "admin" ? <Outlet /> : <Navigate to='/login' />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />;
  };

  return (
    <div className='flex flex-col bg-gray-100 text-white w-full min-h-dvh bg-doodle'>
      <Navbar />

      <Routes>
        <Route exact path='/' element={<HomePage />} />

        <Route element={<LoggedInAdmin />}>
          <Route path='/admin' element={<AdminNav />}>
            <Route path='products/add' element={<AdminAddProductPage />} />
            <Route path='products/manage' element={<AdminManageProductPage />} />
          </Route>
        </Route>

        <Route element={<LoggedIn />}>
          <Route path='/user' element={<UserNav/>}>
            <Route path="profile/:userId" element={<UserProfilePage/> }/>
            <Route path="edit/:userId" element={<UserEditProfilePage/> }/>
            <Route path=":userId/reviews" element={<UserReviewsPage/> }/>
          </Route>
        </Route>
        <Route path='/product/:productId' element={<ProductDetailsPage />} />
        <Route path="*" element={<ErrorPage/>}/>


        <Route element={<NotLoggedIn />}>
          {/* <Route path='/signup' element={<SignupPage />} /> */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/auth' element={<AuthPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
