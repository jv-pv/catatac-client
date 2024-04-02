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
    <div className='flex flex-col mx-auto flex-1 text-black font-aboutFont object-cover mt-16'>
      <section className='flex items-center justify-between w-full  border-black pb-4'>
        <LandingAbout />
      </section>
      <h1 className='text-6xl text-center my-5'>Prints</h1>
      <section className='prints-grid h-full w-full my-4 flex justify-center'>


          <article className='w-full hover:scale-105 transition-transform duration-300 '>
            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-[450px]' />
            <div className="flex justify-between max-w-[450px]">
              <span className="text-2xl">Name</span>
              <span className="text-2xl">$Price</span>
            </div>
          </article>
          <article className='w-full hover:scale-105 transition-transform duration-300 '>
            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-[450px]' />
            <div className="flex justify-between max-w-[450px]">
              <span className="text-2xl">Name</span>
              <span className="text-2xl">$Price</span>
            </div>
          </article>
          <article className='w-full hover:scale-105 transition-transform duration-300 '>
            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-[450px]' />
            <div className="flex justify-between max-w-[450px]">
              <span className="text-2xl">Name</span>
              <span className="text-2xl">$Price</span>
            </div>
          </article>
          <article className='w-full hover:scale-105 transition-transform duration-300 '>
            <img src='/images/cover-img.jpg' alt='test-card' className='object-contain max-w-[450px]' />
            <div className="flex justify-between max-w-[450px]">
              <span className="text-2xl">Name</span>
              <span className="text-2xl">$Price</span>
            </div>
          </article>



      </section>
    </div>
  );
}

export default HomePage;
