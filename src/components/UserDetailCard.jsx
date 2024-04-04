import { NavLink, useLocation } from "react-router-dom";

const UserDetailsCard = ({ thisUser }) => {
  const location = useLocation();

  const isCartPage = thisUser && location.pathname === `/user/${thisUser?._id}/cart`;

  const renderAddressField = (field) => {
    return field ? <p className='italic pl-2'>{field}</p> : null;
  };

  return (
    <article className='flex flex-col justify-center gap-2 bg-red-500 border-2 border-black w-96 shadow-lg'>
      <div className="border-b-2 border-black p-1 drp-shadow">
       <h1 className='text-xl font-headerFontBold text-center'>Your Details</h1>
      </div>
      <div className="pl-3 word-spacing-tight"> 
        <h2>
          <span className='font-headerFontBold'>Email:</span>{" "}
          <span className='italic'>{thisUser?.email}</span>
        </h2>
      </div>
      <div className="pl-3 word-spacing-tight">
        <h2>
          <span className='font-headerFontBold'>Name:</span>{" "}
          <span className='italic'>{thisUser?.name}</span>
        </h2>
      </div>
      {thisUser?.address && (
        <div className="pl-3 pb-2">
          <h2 className='font-headerFontBold'>Address:</h2>
          {renderAddressField(thisUser.address.street)}
          {thisUser.address.city && thisUser.address.state ? (
            <span className='flex gap-[2px] pl-2'>
              {thisUser.address.city}, {thisUser.address.state}
            </span>
          ) : thisUser.address.city ? (
            <span>{thisUser.address.city}</span>
          ) : null}
          {renderAddressField(thisUser.address.country)}
          {renderAddressField(thisUser.address.zipCode)}
          {thisUser?.phoneNumber && <p className='italic pl-2'>{thisUser.phoneNumber}</p>}
        </div>
      )}
      {isCartPage && (
            <NavLink to={`/user/edit/${thisUser?._id}`}>
              <div className="flex pb-2 w-full">
                <button className="pl-3 underline hover:italic">
                    Edit Details
                </button>
              </div>
            </NavLink>
      )}
    </article>
  );
};

export default UserDetailsCard;
