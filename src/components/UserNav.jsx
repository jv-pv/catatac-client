import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const UserNav = () => {
  const { user } = useContext(AuthContext);
  const userProfilePage = location.pathname === `/user/profile/${user?._id}`;
  const userEditPage = location.pathname === `/user/edit/${user?._id}`;
  const userReviewsPage = location.pathname === `/user/${user?._id}/reviews`;

  return (
    <>
      <div className='grid place-items-center font-headerFont text-black w-full h-16 bg-gray-100 fixed top-16 left-0 right-0 z-10'>
        <ul className='flex justify-evenly items-center w-80'>
          {userProfilePage && (
            <>
              <NavLink to={`/user/edit/${user?._id}`}>
                <li>Edit Profile</li>
              </NavLink>
              <li className='select-none'>|</li>
              <NavLink to={`/user/${user?._id}/reviews`}>
                <li>Reviews</li>
              </NavLink>
            </>
          )}
          {userEditPage && (
            <>
              <NavLink to={`/user/profile/${user?._id}`}>
                <li>Profile</li>
              </NavLink>
              <li className='select-none'>|</li>
              <NavLink to={`/user/${user?._id}/reviews`}>
                <li>Reviews</li>
              </NavLink>
            </>
          )}
          {userReviewsPage && (
            <>
              <NavLink to={`/user/edit/${user?._id}`}>
                <li>Edit Profile</li>
              </NavLink>
              <li className='select-none'>|</li>
              <NavLink to={`/user/profile/${user?._id}`}>
                <li>Profile</li>
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default UserNav;
