const AdminAddProductForm = ({newProduct, handleAddSubmit, handleFormChange, handleImageUpload, disabled, addProductSuccessMsg, addProductErrorMsg}) => {
  return (
    <div className='w-96 h-full bg-red-500 p-5 border-2 border-black rounded-md'>
      <form onSubmit={handleAddSubmit} className='flex flex-col h-full'>
        <label htmlFor='image-url'>Image:</label>
        {/* <input type="file" name="" id="" /> */}
        <input
          type='file'
          name='imageUrl'
          id='image-url'
          onChange={handleImageUpload}
          className='my-2 mx-0 px-2 rounded-sm'
          required
        />
        <label htmlFor='product-name'>Name:</label>
        <input
          type='text'
          name='name'
          id='product-name'
          value={newProduct.name}
          onChange={handleFormChange}
          className='my-2 mx-0 px-1 rounded-sm'
          required
        />
        <label htmlFor='product-description'>Description:</label>
        <textarea
          type='text'
          name='description'
          id='product-description'
          value={newProduct.description}
          onChange={handleFormChange}
          className='my-2 mx-0 px-1 rounded-sm'
          required
        />
        <label htmlFor='product-price'>Price:</label>
        <input
          type='number'
          name='price'
          id='product-price'
          value={newProduct.price}
          onChange={handleFormChange}
          className='my-2 mx-0 px-1 rounded-sm'
          required
        />
        <label htmlFor='product-stock'>Stock:</label>
        <input
          type='number'
          name='stock'
          id='product-stock'
          value={newProduct.stock}
          onChange={handleFormChange}
          className='my-2 mx-0 px-1 rounded-sm'
          required
        />
        {disabled ? (
          <button
            disabled={disabled}
            className='flex justify-center items-center mt-6 bg-orange-300 w-24 self-center p-1 rounded-sm hover:bg-gray-900 hover:text-white transition-colors duration-300'
          >
            <img src='/svg/loading.svg' alt='loading-spinner' className='spin w-5' />
          </button>
        ) : (
          <button
            type='submit'
            disabled={disabled}
            onClick={() => {
              setTimeout(() => {
                setShowModal(false);
              }, 1000);
            }}
            className='mt-6 bg-orange-300 w-24 self-center p-1 rounded-sm hover:bg-gray-900 hover:text-white transition-colors duration-300'
          >
            Edit
          </button>
        )}
      </form>
      {addProductErrorMsg && <p className='text-center mt-3'>{addProductErrorMsg}</p>}
      {addProductSuccessMsg && <p className='text-center mt-3'>{addProductSuccessMsg}</p>}
    </div>
  );
};

export default AdminAddProductForm;
