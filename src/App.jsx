import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AuthPage from "./pages/AuthPage";

function App() {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  // Outlet renders whatever the current nested route url path element is
  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />;
  };

  return (
    <div className='flex flex-col bg-gray-100 text-white w-full min-h-dvh bg-doodle'>
      <Navbar />

      <Routes>
        <Route exact path='/' element={<HomePage />} />

        <Route element={<LoggedIn />}>
          <Route path="/admin/products" element={<AdminProductFormPage />} />

        </Route>

        <Route element={<NotLoggedIn />}>
          {/* <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} /> */}
          <Route path="/auth" element={<AuthPage/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
