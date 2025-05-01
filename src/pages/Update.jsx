import React, { useEffect, useState } from 'react'
import { replace, useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../config/SupabaseClient'

function Update() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [productDetail, setProductDetail] = useState({
    title: "",
    price: "",
    description: ""
  })
  const [formError, setFormError] = useState(null)


  const fetchSingleProduct = async () => {
    const { data, error } = await supabase.from("products").select().eq("id", id).single()

    if(error){
        navigate("/", { replace: true })
    }

    if(data){
        setProductDetail(data)
        console.log(data);
    }
  }

  const updateProduct = async (e) => {
    e.preventDefault()
    if(productDetail.title === "" || productDetail.price === "" || productDetail.description === ""){
        setFormError("Input all fields")
        return
    }

    const { data, error } = await supabase.from("products").update(productDetail).eq("id", id).select()

    if(error){
        console.log(error);
        setFormError("Error in adding product.")
    }
    if(data){
        console.log(data)
        setFormError(null)
        navigate("/")
      }

}

  useEffect( () => {
    fetchSingleProduct()
  }, [id])
  const handleChange = (e) => {
    setProductDetail({ ...productDetail, [e.target.name]: e.target.value })
  }
  return (
    <>
        <h2 className="text-3xl my-10 text-center">Update product</h2>
        <form onSubmit={updateProduct} className='w-2/4 mx-auto py-5 px-5'>
            <div className='mb-5'>
                <input className='w-full py-3 px-4 rounded outline-none border-2 border-primary' type="text" name="title" value={productDetail.title} onChange={handleChange}/>
            </div>
            <div className='mb-5'>
                <input className='w-full py-3 px-4 rounded outline-none border-2 border-primary' type="text" name="price" value={productDetail.price} onChange={handleChange}/>
            </div>
            <div className='mb-5'>
                <input className='w-full py-3 px-4 rounded outline-none border-2 border-primary' type="text" name="description" value={productDetail.description} onChange={handleChange}/>
            </div>
            <div className='flex justify-center'>
                <button className='bg-primary py-2 px-10 rounded cursor-pointer'>Update</button>
            </div>
        </form>

        {formError && <p>{formError}</p>}
    </>
  )
}

export default Update