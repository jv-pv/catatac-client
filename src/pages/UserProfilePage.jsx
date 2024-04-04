import { useContext, useEffect, useState } from "react";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";
import UserDetailsCard from "../components/UserDetailCard";

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [thisUser, setThisUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await get(`/users/profile/${user?._id}`);
      setThisUser(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUser();
    }
  }, []);

  return (
    <section className='flex flex-col flex-1 items-center mt-36 text-black font-headerFont'>
      <UserDetailsCard thisUser={thisUser} />
    </section>
  );
};

export default UserProfilePage;
