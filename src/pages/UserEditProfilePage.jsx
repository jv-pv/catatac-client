import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { put, axiosDelete } from "../services/authService";
import { ThisUserContext } from "../context/user.context";
import UserEditProfileForm from "../components/UserEditProfileForm";

const UserEditProfilePage = () => {
  const { user, logOutUser } = useContext(AuthContext);
  const { thisUser, fetchThisUser } = useContext(ThisUserContext)
  const navigate = useNavigate()

  const [editedUser, setEditedUser] = useState({
    email: "",
    name: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
    },
    phoneNumber: ""
  });

  useEffect(() => {
    if (user) {
      fetchThisUser()
    }
  }, [user])

  useEffect(() => {
    if (thisUser) {
      setEditedUser({
        email: thisUser.email || "",
        name: thisUser.name || "",
        address: thisUser.address || {
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
        phoneNumber: thisUser.phoneNumber || "",
      });
    }
  }, [thisUser]);

  const handleFormChange = (e) => {
    const {name, value} = e.target
    if (name.startsWith("address")) {
        const addressName = name.split(".").at(1)
        setEditedUser((prev) => ({
            ...prev,
            address: {
                ...prev.address,
                [addressName]: value
            }
        }))
    } else {
        setEditedUser((prev) => ({
            ...prev,
            [name]: value
        }))
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
        await put(`/users/profile/edit/${user?._id}`, editedUser)
        navigate(`/user/profile/${user?._id}`)
    } catch (error) {
        console.error(error)
    }
  }


  const handleUserDelete = async () => {
    try {
      navigate("/")
      await axiosDelete(`/users/profile/delete/${user._id}`)
      logOutUser()
    } catch (error) {
        console.error("Error deleting user")
    }
}

  return (
    <section className='flex flex-col flex-1 items-center mt-36 text-black font-headerFont'>
      <UserEditProfileForm editedUser={editedUser} handleFormChange={handleFormChange} handleFormSubmit={handleFormSubmit}  handleUserDelete={handleUserDelete} />
    </section>
  );
};

export default UserEditProfilePage;

// editedUser, handleFormSubmit, handleFormSubmit, handleUserDelete