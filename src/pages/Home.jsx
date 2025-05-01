import { useEffect, useState } from "react"
import Table from "../components/Table"
import { useProduct } from "../contexts/ProductContext"

function Home() {
  const {supbaseError, products, fetchProducts} = useProduct()

  useEffect( () => {
    fetchProducts()

  }, [])

  return (
    <>
        <h2 className="text-3xl my-10 text-center">Home page</h2>
        {
            supbaseError ? 
                <h1 className="my-10 text-center">{supbaseError}</h1> 
                :(
                    <div className="flex justify-center overflow-x-auto">
                        <Table products={products}/>
                    </div>

                )
        }

    </>
  )
}

export default Home