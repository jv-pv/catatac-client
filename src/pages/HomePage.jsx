import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import { get } from "../services/authService";
import LandingAbout from "../components/LandingAbout";

function HomePage() {
  // const [products, setProducts] = useState([])
  // const { isLoggedIn, user } = useContext(AuthContext);
  // const fetchUsers = async () => {
  //   const authToken = localStorage.getItem("authToken");

  //   try {
  //     let response = await get("/products", {
  //       headers: { Authorization: `Bearer ${authToken}` },
  //     });
  //     setProducts(response.data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // };

  return (
    <div className='flex flex-col bg-gray-100 flex-1 text-black font-aboutFont bg-doodle object-cover py-5'>
      <section className='flex items-center justify-around w-full border-b-2 border-black pb-4'>
        <LandingAbout />
      </section>
        <h1 className='text-6xl text-center mb-5'>Prints</h1>
      <section className='max-w-[1500px]'>

        <article className="flex items-center justify-evenly w-full h-full">

            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-20' />
            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-20' />
            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-20' />
            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-20' />
            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-20' />
          
        </article>

      </section>
    </div>
  );
}

export default HomePage;
