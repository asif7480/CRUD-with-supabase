import { useEffect, useState } from "react"
import { supabase } from "../config/SupabaseClient"
import { Link } from "react-router-dom"

function Home() {
  const [fetchError, setFetchError] = useState(null)
  const [products, setProducts] = useState([])

  const fetchProducts = async() => {
    const { data, error } = await supabase.from("products").select()

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
    const { data, error } = await supabase.from("products").delete().eq("id", id)

    if(error) console.log(error);

    if(data) console.log(data);
    setProducts(products.filter( (product) => product.id !== id))
    
    
  }

  useEffect( () => {
    fetchProducts()

  }, [])

  return (
    <>
        <h2>Home page</h2>
        {
            fetchError ? 
                <h1>{fetchError}</h1> 
                :(
                    <table border={1}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
        
                    <tbody>
                        {
                            products.length !== 0 && products.map( (product, index) => (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>{product.title}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                    <td>
                                        <Link to={`/${product.id}`}>Update</Link>
                                        <button onClick={() => handleDelete(product.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                )
        }

    </>
  )
}

export default Home