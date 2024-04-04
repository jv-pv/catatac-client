import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { put, get, axiosDelete } from "../services/authService";

const UserEditProfilePage = () => {
  const { user, authenticateUser, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const [thisUser, setThisUser] = useState(null)
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

  const fetchUser = async () => {
      try {
          const response = await get(`/users/profile/${user?._id}`)
          setThisUser(response.data)
      } catch (error) {
          console.error(error.response.data)
      }
  }

  useEffect(() => {
    if (user) {
      fetchUser()
    }
  }, [user])

  useEffect(() => {
    if (thisUser) {
      setEditedUser({
        email: thisUser.email,
        name: thisUser.name,
        address: thisUser.address || {
          street: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
        },
        phoneNumber: thisUser.phoneNumber,
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
        const response = await put(`/users/profile/edit/${user?._id}`, editedUser)
        navigate(`/user/profile/${user?._id}`)
    } catch (error) {
        console.error(error)
    }
  }


  const handleUserDelete = async () => {
    try {
      navigate("/")
      logOutUser()
      await axiosDelete(`/users/profile/delete/${user._id}`)
    } catch (error) {
        console.error("Error deleting user")
    }
}

  return (
    <section className='flex flex-col flex-1 items-center mt-36 text-black font-headerFont'>
      <div className='bg-red-500 w-96 p-6 rounded-sm border-2 border-black'>
        <form className='flex flex-col' onSubmit={handleFormSubmit}>
          <label htmlFor='user-email'>Email:</label>
          <input
            type='text'
            name='email'
            id='user-email'
            value={editedUser.email}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm bg-red-200'
            readOnly={true}
          />
          <label htmlFor='user-name'>Name:</label>
          <input
            type='text'
            name='name'
            id='user-name'
            value={editedUser.name}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
          />
          <label htmlFor='address-street'>Street:</label>
          <input
            type='text'
            name='address.street'
            id='address-street'
            value={editedUser.address.street}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
          />
          <label htmlFor='address-city'>City:</label>
          <input
            type='text'
            name='address.city'
            id='address-city'
            value={editedUser.address.city}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
          />
          <label htmlFor='address-state'>State:</label>
          <input
            type='text'
            name='address.state'
            id='address-state'
            value={editedUser.address.state}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
          />
          <label htmlFor='address-country'>Country:</label>
          <input
            type='text'
            name='address.country'
            id='address-country'
            value={editedUser.address.country}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
          />
          <label htmlFor='address-zip'>ZipCode:</label>
          <input
            type='text'
            name='address.zipCode'
            id='address-zip'
            value={editedUser.address.zipCode}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
          />
          <label htmlFor='user-phone'>Phone:</label>
          <input
            type='tel'
            name='phoneNumber'
            id='user-phone'
            value={editedUser.phoneNumber}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
          />

          <div className="flex items-center justify-center gap-5">

            <button
              type='submit'
              className='inline mt-6 bg-blue-500 text-white w-24 self-center p-1 rounded-sm hover:bg-gray-900 transition-colors duration-300'
            >
              Edit
            </button>
            <button
              className='inline mt-6 bg-red-700 text-white w-24 self-center p-1 rounded-sm hover:bg-gray-900 transition-colors duration-300'
              onClick={handleUserDelete}
            >
              Delete
            </button>

          </div>


        </form>
      </div>
    </section>
  );
};

export default UserEditProfilePage;
