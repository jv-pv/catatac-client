import { useState, createContext } from "react";
import { get } from "../services/authService";

const ProductContext = createContext({
    products: [],
    fetchProducts: () => {}
})

const ProductProvider = ({children}) => {

    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await get("/products")
            setProducts(response.data)
        } catch (error) {
            console.error("Error fetching websites", error)
        }
    }

  return (
    <ProductContext.Provider value={{products, fetchProducts}}>
        {children}
    </ProductContext.Provider>
  )
}

export { ProductProvider, ProductContext }