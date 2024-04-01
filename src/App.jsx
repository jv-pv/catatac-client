import { useContext } from "react";
import { AuthContext } from "./context/auth.context";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthPage from "./pages/AuthPage";
import AddProductForm from "./components/AddProductForm";
import AdminNav from "./components/AdminNav";
import ManageProduct from "./components/ManageProduct";
import "./App.css";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const { user } = useContext(AuthContext)

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
          <Route path="/admin" element={<AdminNav/>}>
            <Route path="products/add" element={<AddProductForm/>} />
            <Route path="products/manage" element={<ManageProduct/>} />
          </Route>
        </Route>

        <Route element={<LoggedIn />}> </Route>

        <Route element={<NotLoggedIn />}>
          {/* <Route path='/signup' element={<SignupPage />} /> */}
          <Route path='/login' element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
