import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/SupabaseClient";
import { useNavigate } from "react-router-dom";

const ProductContext = createContext(null)

export const ProductContextProvider = ({ children }) => {
    const [supbaseError, setSupabaseError] = useState(null)
    const [products, setProducts] = useState([])

    
    const fetchProducts = async() => {
    const { data, error } = await supabase.from("products").select().order("id", { ascending: true })

        if(error){
            setSupabaseError("Error in fetching data.")
            setProducts([])
            console.log(error);    
        }

        if(data){
            setSupabaseError(null)
            setProducts(data)
        }    
    }

    const addNewProduct =async (newProduct) => {
        const {data, error} = await supabase.from("products").insert([newProduct]).select()
  
        if(error){
        console.log(error);
        setSupabaseError("Error in adding product.")
        }

        if(data){
        console.log(data)
        setSupbaseError(null)
        // navigate("/")
        }
    }

    const updateProduct = async (id, product ) => {
        const { data, error } = await supabase.from("products").update(product).eq("id", id).select()
    
        if(error){
            console.log(error);
            setSupabaseError("Error in adding product.")
        }
        if(data){
            console.log(data)
            setSupabaseError(null)
            // navigate("/")
        }
    }
    const handleDelete = async (id) => {
    let confirm = window.confirm("Are you sure you want to delete.")
    if(confirm){
        const { data, error } = await supabase.from("products").delete().eq("id", id)

        if(error) console.log(error);
    
        if(data) console.log(data);
        setProducts(products.filter( (product) => product.id !== id))
    }

  }
    return(
        <ProductContext.Provider value={{products, setProducts, supbaseError, fetchProducts, handleDelete, addNewProduct, updateProduct}}>
            { children }
        </ProductContext.Provider>
    )
}

export const useProduct = () => {
    const context = useContext(ProductContext)
    if(!context){
        throw new Error("useProduct must be inside ProductProvider")
    }
    return context
}