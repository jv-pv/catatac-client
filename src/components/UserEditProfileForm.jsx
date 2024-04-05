const UserEditProfileForm = ({editedUser, handleFormChange, handleFormSubmit, handleUserDelete}) => {
  return (
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

        <div className='flex items-center justify-center gap-5'>
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
  );
};

export default UserEditProfileForm;
