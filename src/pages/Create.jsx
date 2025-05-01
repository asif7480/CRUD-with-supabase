import React, { useState } from 'react'
import { supabase } from '../config/SupabaseClient'
import { useNavigate } from 'react-router-dom'

function Create() {
  const [productDetail, setProductDetail] = useState({
    title: "",
    price: "",
    description: ""
  })

  const navigate = useNavigate()
  const [formError, setFormError] = useState(null)

  const handleChange = (e) => setProductDetail({ ...productDetail, [e.target.name]: e.target.value })

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(productDetail.title === "" || productDetail.price === "" || productDetail.description === ""){
      setFormError("Input all fields")
      return
    }

    // console.log(productDetail);
    
    const {data, error} = await supabase.from("products").insert([productDetail]).select()
  
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
  return (
    <>
      <h2 className="text-3xl my-10 text-center">Add new product</h2>
      
      <form onSubmit={handleSubmit} className='w-2/4 mx-auto py-5 px-5'>
        <div className='mb-5'>
          <input className='w-full py-3 px-4 rounded outline-none border-2 border-primary' type="text" name="title" placeholder='Enter title' value={productDetail.title} onChange={handleChange}/>
        </div>

        <div className='mb-5'>
          <input className='w-full py-3 px-4 rounded outline-none border-2 border-primary' type="text" name="price" placeholder='Enter price' value={productDetail.price} onChange={handleChange}/>
        </div>

        <div className='mb-5'>
          <input className='w-full py-3 px-4 rounded outline-none border-2 border-primary' type="text" name="description" placeholder='Enter description' value={productDetail.description} onChange={handleChange}/>
        </div>

        <div className='flex justify-center'>
          <button className='bg-primary py-2 px-10 rounded cursor-pointer'>Submit</button>
        </div>
      </form>
      {formError && <p>{formError}</p>}

    </>
  )
}

export default Create