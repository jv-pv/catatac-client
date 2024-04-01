import { NavLink, Outlet } from "react-router-dom";


const AdminNav = () => {
  return (
    <>
    <div className='grid place-items-center font-headerFont text-black w-full h-20'>
      <ul className='flex justify-evenly items-center w-80'>
        <NavLink to='/admin/products/add'>
          <li>Add Products</li>
        </NavLink>
        <li className='select-none'>|</li>
        <NavLink to='/admin/products/manage'>
            <li>Manage Products</li>
        </NavLink>
      </ul>
    </div>
    <Outlet/>
    </>
  );
};

export default AdminNav;
