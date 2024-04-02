import React from 'react'

const EditProduct = ({children, showModal, closeModal}) => {
  return showModal ? (
    <div className='fixed inset-0 flex justify-center items-center z-10 bg-blackOpaque backdrop-blur-sm' onClick={() => closeModal()}>
        <div onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
  ) : null
}

export default EditProduct