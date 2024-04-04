import { useContext, useEffect, useState } from "react";
import { get } from "../services/authService";
import { AuthContext } from "../context/auth.context";

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

  const renderAddressField = (field) => {
    return field ? <p className='italic'>{field}</p> : null;
  };

  return (
    <section className='flex flex-col flex-1 items-center mt-36 text-black font-headerFont'>
      <article className='flex flex-col justify-center gap-2 bg-red-500 border-2 border-black w-96 p-5'>
        <h1 className='text-xl font-headerFontBold text-center'>Your Details</h1>
        <div>
          <h2>
            <span className='font-headerFontBold'>Email:</span>{" "}
            <span className='italic'>{thisUser?.email}</span>
          </h2>
        </div>
        <div>
          <h2>
            <span className='font-headerFontBold'>Name:</span>{" "}
            <span className='italic'>{thisUser?.name}</span>
          </h2>
        </div>
        {thisUser?.address && (
          <div>
            <h2 className='font-headerFontBold'>Address:</h2>
            {renderAddressField(thisUser.address.street)}
            {thisUser.address.city && thisUser.address.state ? (
              <span className='flex gap-[2px]'>
                {thisUser.address.city}, {thisUser.address.state}
              </span>
            ) : thisUser.address.city ? (
              <span>{thisUser.address.city}</span>
            ) : null}
            {renderAddressField(thisUser.address.country)}
            {renderAddressField(thisUser.address.zipCode)}
            {thisUser?.phoneNumber && <p className='italic'>{thisUser.phoneNumber}</p>}
          </div>
        )}
      </article>
    </section>
  );
};

export default UserProfilePage;
