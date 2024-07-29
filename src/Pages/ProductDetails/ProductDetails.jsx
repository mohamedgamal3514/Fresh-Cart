import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function ProductDetails() {
    const { addProductToCart } = useContext(CartContext)
    const { id } = useParams()
    const [productDetails, setProductDetails] = useState(null)
    async function getProductDetails(id) {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            setProductDetails(data?.data)
            console.log(data?.data)
        } catch (error) {
        }
    }

    useEffect(() => {
        getProductDetails(id)
    }, [])

    return (
        <>
            <div className='grid grid-cols-12 mt-10'>
                <div className='col-span-12 md:col-span-2 shadow-lg'>
                    <img src={productDetails?.imageCover} className='w-full' alt={productDetails?.title} />
                </div>
                <div className='col-span-12 md:col-span-10 shadow-lg p-5 md:p-16 '>
                    <h2 className='text-center text-slate-900 my-5 font-semibold text-4xl'>{productDetails?.title}</h2>
                    <div className='flex  flex-col h-full'>
                        <p className='text-xl text-slate-600'>{productDetails?.description}</p>
                        <h2 className='text-xl text-slate-500 my-7'>{productDetails?.category?.name}</h2>
                        <div className='flex items-center justify-between w-full text-slate-800 text-xl mb-12'>
                            <div>
                                <span>{productDetails?.price} EGP</span>
                            </div>
                            <div>
                                <span>{productDetails?.ratingsAverage} <i className="fa-solid fa-star text-yellow-400 text-lg"></i></span>
                            </div>
                        </div>
                        <button onClick={() => addProductToCart(productDetails?._id)} className='w-full bg-slate-500 hover:bg-slate-700 duration-200 transition-all text-slate-50 py-1 rounded-md'>Add to bag</button>
                    </div>
                </div>
            </div>
        </>
    )
}
