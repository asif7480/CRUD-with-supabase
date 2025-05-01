import React from 'react'
import { Link } from 'react-router-dom'
import { useProduct } from '../contexts/ProductContext'

const Table = ({ products }) => {
  const { handleDelete } = useProduct()
  return (
    <>
         <table className="md:w-2/3">
            <thead className="bg-gray-50 border-b-2 border-gray-200 text-black">
                <tr>
                    <th className="p-3 text-sm font-semibold">Id</th>
                    <th className="p-3 text-sm font-semibold">Title</th>
                    <th className="p-3 text-sm font-semibold">Price</th>
                    <th className="p-3 text-sm font-semibold">Description</th>
                    <th className="p-3 text-sm font-semibold">Actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    products.length !== 0 && products.map( (product, index) => (
                        <tr className="bg-white text-gray-700 text-center border-b-2 border-gray-200" key={index}>
                            <td className="p-3 text-sm">{product.id}</td>
                            <td className="p-3 text-sm">{product.title}</td>
                            <td className="p-3 text-sm">{product.price}</td>
                            <td className="p-3 text-sm">{product.description}</td>
                            <td className="p-3 text-sm">
                                <Link className="text-blue-500 hover:text-white border border-blue-500 hover:bg-blue-500 p-2 mx-2 rounded transition-all duration-150" to={`/${product.id}`}>Update</Link>
                                <button className="text-red-500 hover:text-white border border-red-500 hover:bg-red-500 p-2 mx-2 rounded transition-all duration-150" onClick={() => handleDelete(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    
    </>
  )
}

export default Table