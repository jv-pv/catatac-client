import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { ThisUserContext } from "../context/user.context";
import UserDetailsCard from "../components/UserDetailCard";

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  const {thisUser, fetchThisUser} = useContext(ThisUserContext)

  useEffect(() => {
    if (user) {
      fetchThisUser();
    }
  }, []);

  return (
    <section className='flex flex-col flex-1 items-center mt-36 text-black font-headerFont'>
      <UserDetailsCard thisUser={thisUser} />
    </section>
  );
};

export default UserProfilePage;
