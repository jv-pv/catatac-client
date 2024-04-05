import { useContext, useEffect, useState } from "react";
import { get } from "../services/authService";
import LandingAbout from "../components/LandingAbout";
import { ProductContext } from "../context/product.context";
import ProductCards from "../components/ProductCards";

function HomePage() {
  const { products, fetchProducts } = useContext(ProductContext);

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='flex flex-col mx-auto flex-1 text-black font-aboutFont object-cover mt-[60px]'>
      <section className='flex items-center justify-between gap-48 w-full border-black pb-4'>
        <LandingAbout />
      </section>
      <h1 className='text-6xl text-center my-5'>Prints</h1>
      <section className='prints-grid h-full max-w-[1350px] my-4 self-center'>
        {products.map((product) => (
          <ProductCards key={product._id} product={product} />
        ))}
      </section>
    </div>
  );
}

export default HomePage;
