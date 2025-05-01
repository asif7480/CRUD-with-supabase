import { useEffect, useState } from "react"
import { supabase } from "../config/SupabaseClient"
import { Link } from "react-router-dom"
import Table from "../components/Table"

function Home() {
  const [fetchError, setFetchError] = useState(null)
  const [products, setProducts] = useState([])

  const fetchProducts = async() => {
    const { data, error } = await supabase.from("products").select().order("id", { ascending: true })

    if(error){
        setFetchError("Error in fetching data.")
        setProducts([])
        console.log(error);
        
    }

    if(data){
        setFetchError(null)
        setProducts(data)
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

  useEffect( () => {
    fetchProducts()

  }, [])

  return (
    <>
        <h2 className="text-3xl my-10 text-center">Home page</h2>
        {
            fetchError ? 
                <h1 className="my-10 text-center">{fetchError}</h1> 
                :(
                    <div className="flex justify-center overflow-x-auto">
                        <Table products={products} handleDelete={handleDelete}/>
                    </div>

                )
        }

    </>
  )
}

export default Home