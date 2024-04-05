import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar({cartItems}) {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAdminProductsPage = location.pathname.startsWith("/admin/products/");
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const navHeight = navRef.current.offsetHeight;

      if (scrollTop > navHeight - 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <nav
      ref={navRef}
      className={`flex h-16 font-headerFont fixed top-0 left-0 right-0 z-10 ${
        isScrolled ? "bg-gray-100 drop-shadow-md" : "bg-transparent"
      }`}
    >
      <div className='flex items-center pl-3'>
        <img src='/images/catatac-logo.png' alt='catatac-logo' className='w-[100px] h-full' />
      </div>

      <ul className='flex items-center justify-end gap-3 flex-1 h-full'>
        {getToken() ? (
          <>
            {!isHomePage && (
              <li>
                <NavLink to='/'>
                  <button>Home</button>
                </NavLink>
              </li>
            )}
            {!isAdminProductsPage && user?.role === "admin" && (
              <li>
                <NavLink to='/admin/products/add'>
                  <button className='tracking-tighter word-spacing'>Admin Panel</button>
                </NavLink>
              </li>
            )}
            <li className='pr-3'>
              <NavLink>
                <button onClick={logOutUser}>Logout</button>
              </NavLink>
            </li>
            {user?.role === "user" && (
              <>
                <li className='flex gap-5 pr-4'>
                  <NavLink to={`/user/profile/${user._id}`}>
                    <img src='/svg/profile-circle-black.svg' alt='' className='text-black' />
                  </NavLink>
                  <NavLink to={`/user/${user._id}/cart`}>
                    <div className='relative'>
                      <span className='inline-block w-4 h-4 absolute rounded-full bottom-4 right-4 bg-black text-white text-center text-xs'>
                        {cartItems.length}
                      </span>
                      <img src='/svg/cart-black.svg' alt='/cart-black.svg' />
                    </div>
                  </NavLink>
                </li>
              </>
            )}
          </>
        ) : (
          <>
            {!isHomePage && (
              <li>
                <NavLink to='/'>
                  <button>Home</button>
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li className='pr-4'>
                <NavLink to='/auth'>
                  <button>Sign In</button>
                </NavLink>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;

// {getToken() ? (
//   <>
//     <button onClick={logOutUser}>Logout</button>
//     {/* <span>{user && user.name}</span> */}
//   </>
// ) : (
//   <>
//   {!isHomePage && (
//     <Link to='/'>
//       <button className="text-black">Home</button>
//     </Link>
//   )}
//     <Link to='/signup'>
//       <button className="text-black">Sign In</button>{" "}
//     </Link>
//     <Link to='/login'>
//       {" "}
//       <button className="text-black">Login</button>{" "}
//     </Link>
//   </>
// )}
