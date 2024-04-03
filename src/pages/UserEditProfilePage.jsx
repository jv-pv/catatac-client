import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { put } from "../services/authService";

const UserEditProfilePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate()

  const [editedUser, setEditedUser] = useState({
    email: user?.email,
    name: user?.name,
    address: {
      street: user?.street ?? "",
      city: user?.city ?? "",
      state: user?.state ?? "",
      country: user?.country ?? "",
      zipCode: user?.zipCode ?? "",
    },
    phoneNumber: user?.phoneNumber ?? "",
  });


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
        console.log(response.data)
        navigate(`/user/profile/${user?._id}`)
    } catch (error) {
        console.error(error)
    }
  }

  return (
    <section className='flex flex-col flex-1 items-center mt-36 text-black'>
      <div className='bg-red-500 w-96 text-xl p-6 rounded-sm'>
        <form className='flex flex-col' onSubmit={handleFormSubmit}>
          <label htmlFor='user-email'>Email:</label>
          <input
            type='text'
            name='email'
            id='user-email'
            value={editedUser.email}
            onChange={handleFormChange}
            className='my-2 mx-0 px-1 rounded-sm'
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
          <button
            type='submit'
            className='mt-6 bg-orange-300 w-24 self-center p-1 rounded-sm hover:bg-gray-900 hover:text-white transition-colors duration-300'
          >
            Edit
          </button>
        </form>
      </div>
    </section>
  );
};

export default UserEditProfilePage;
