import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import AdminProductFormPage from "./pages/AdminProductFormPage";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />;
  };

  return (
    <div className='flex flex-col bg-gray-100 text-white w-full min-h-dvh'>
      <Navbar />

      <Routes>
        <Route exact path='/' element={<HomePage />} />

        <Route element={<LoggedIn />}>
          <Route path="/admin/products" element={<AdminProductFormPage />} />

        </Route>

        <Route element={<NotLoggedIn />}>
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
