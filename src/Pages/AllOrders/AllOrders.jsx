import React, { useContext, useEffect, useState } from 'react'

import img from "../../assets/slider-image-1.jpeg"
import { UserContext } from '../../Context/UserContext'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

export default function AllOrders() {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState(null)
    const { id } = jwtDecode(localStorage.getItem("token"))


    async function displayOrders() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET"
            }
            const { data } = await axios.request(options)
            console.log(data)
            setOrders(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        displayOrders()
    }, [])



    return (
        <>
            <section className='mt-12'>
                {!orders ? (<Loading />) : (
                    orders?.map((order) => <div className='border border-slate-600 p-5'>
                        <div>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h2 className='font-semibold'>Order ID : <span>{order?.id}</span></h2>
                                </div>
                                <div className='flex gap-5'>
                                    {order?.isDelivered ? <span className='inline-block font-semibold'>Delivered</span> : <span className='inline-block font-semibold'>On Delivery</span>}
                                    {order?.isPaid ? <span className='inline-block font-semibold'> Paid</span> : <span className='inline-block font-semibold'>Not Paid</span>}
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-12 mt-4 gap-5'>
                            {order?.cartItems.map((item) => <div className='col-span-6 md:col-span-4 lg:col-span-2 shadow-md'>
                                <img src={item.product.imageCover} className='w-full object-fill' alt="" />
                                <div className='mt-2 p-2'>
                                    <h3>{item.product.title}</h3>
                                    <span>{item?.price} EGP</span>
                                </div>
                            </div>)}
                        </div>
                    </div>)
                )}
            </section>
        </>
    )
}
