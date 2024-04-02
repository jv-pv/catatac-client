import { useEffect, useContext, useState } from "react";
import { ProductContext } from "../context/product.context";
import AdminProductCard from "../components/AdminProductCard";


const AdminManageProductPage = () => {

    const {products, fetchProducts} = useContext(ProductContext)

    useEffect(() => {
        fetchProducts()
    }, [])


  return (
    <section className='flex flex-col items-center gap-5 flex-1 mb-4 pt-36'>
    
    {products.map((product) => (
        <AdminProductCard key={product._id} product={product}/>
    ))}
    </section>
  );
};

export default AdminManageProductPage;
