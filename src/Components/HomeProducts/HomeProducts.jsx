import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Card } from "flowbite-react";
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import MainSlider from '../MainSlider/MainSlider';
import CatSlider from '../CategorySlider/CatSlider';
import { CartContext } from '../../Context/CartContext';
import { wishListContext } from '../../Context/WishListContext';

export default function HomeProducts() {
    const [allProducts, setAllProducts] = useState(null)
    const [loading, setLoading] = useState(false)
    const { addProductToCart } = useContext(CartContext)
    const { addToWishList, setWishList } = useContext(wishListContext)
    async function getAllProducts() {
        try {
            setLoading(true)
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products")
            setAllProducts(data.data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            {loading ? <Loading /> :
                <>
                    <MainSlider />
                    <CatSlider />
                    <div className='grid grid-cols-12 gap-7 my-10 p-x-5  transition-all duration-300'>
                        {allProducts?.map((product) =>
                            <div key={product?._id} className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3  hover:shadow-xl shadow-slate-900 transition-transform duration-300'>
                                <Card className='rounded-none' imgAlt={product.title} imgSrc={product.imageCover}>
                                    <div className='flex items-center justify-between'>
                                        <h5 className="text-md font-semibold tracking-tight text-gray-900 ">
                                            {product.title.split(' ').slice(0, 2).join(' ')}
                                        </h5>
                                        <div className="my-2 flex items-center">
                                            <i className="fa-solid fa-star text-yellow-400 text-lg"></i>
                                            <span className="ml-3 mr-2 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800">
                                                {product?.ratingsAverage}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-bold text-gray-500">{product?.price} EGP</span>
                                        <div>
                                            <ul className='flex items-center gap-x-3'>
                                                <Link>
                                                    <i onClick={() => addToWishList(product?._id)} className="fa-solid fa-heart  text-lg text-slate-500 hover:text-slate-700 duration-200 transition-all cursor-pointer"></i>
                                                </Link>
                                                <Link to={`/productDetails/${product?._id}`}>
                                                    <i className="fa-solid fa-eye text-lg text-slate-500 hover:text-slate-700 duration-200 transition-all cursor-pointer"></i>
                                                </Link>
                                                <Link>
                                                    <i onClick={() => addProductToCart(product?._id)} className={`fa-solid fa-cart-plus text-lg ${setWishList?.status === "success" ? "text-red-700" : "text-slate-400"} hover:text-slate-700 duration-200 transition-all cursor-pointer`}></i>
                                                </Link>
                                            </ul>
                                        </div>
                                    </div>
                                </Card>
                            </div>)}
                    </div>
                </>}
        </>
    )
}
