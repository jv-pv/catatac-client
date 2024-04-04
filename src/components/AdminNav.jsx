import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminNav = () => {

  const [isScrolled, setIsScrolled] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const navHeight = navRef.current.offsetHeight
  
      if (scrollTop > navHeight - 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }

  }, [])



  return (
    <>
    <div ref={navRef} className={`grid place-items-center font-headerFont text-black w-full h-16 bg-gray-100 fixed top-16 left-0 right-0 z-10 ${isScrolled ? "bg-gray-100 drop-shadow-md" : "bg-transparent" }`}>
      <ul className='flex justify-evenly items-center w-96'>
        <NavLink to='/admin/products/add'>
          <li>Add Products</li>
        </NavLink>
        <li className='select-none'>|</li>
        <NavLink to='/admin/products/manage'>
            <li>Manage Products</li>
        </NavLink>
        <li className='select-none'>|</li>
        <NavLink to="/admin/orders">
            <li>Orders</li>
        </NavLink>
      </ul>
    </div>
    <Outlet/>
    </>
  );
};

export default AdminNav;
