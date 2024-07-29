import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'

export default function Cart() {

    const { diplayCartItems, cartItems, removeCartItem, updateItemCount,clearCart } = useContext(CartContext)
    useEffect(() => {
        diplayCartItems()
    }, [])

    return (
        <>
            <section className="mt-10 rounded-md py-8 antialiasedmd:py-16">
                {cartItems?.length === 0 ? <div className='flex items-center flex-col bg-slate-200 p-10'>
                            <h3 className='text-slate-600 text-4xl'>Your Cart Is Empty</h3>
                            <Link to={'/'}>
                                <span className='text-xl text-slate-50 hover:underline mt-5 block bg-slate-800 py-1 px-3 rounded-md'>Back To Home</span>
                            </Link>
                        </div>: 
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            <div className='flex items-center justify-between'>
                                <h2 className="text-3xl font-semibold text-slate-700">Shopping Cart</h2>
                                <button onClick={clearCart} className='text-slate-800 text-xl hover:border-b-2 border-slate-900'>Remove All</button>
                            </div>
                            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                                <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                                    <div className="space-y-6">
                                        {cartItems?.data?.products?.map((product) => <div key={product?._id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6">
                                            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                                <a href="#" className="shrink-0 md:order-1">
                                                    <img className="h-20 w-20 dark:hidden" src={product?.product.imageCover} alt="imac image" />
                                                </a>
                                                <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                                <div className="flex items-center justify-between md:order-3 md:justify-end">
                                                    <div className="flex items-center">
                                                        <button onClick={() => updateItemCount(product?.product.id, product?.count - 1)} type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 ">
                                                            <i className="fa-solid fa-minus"></i>
                                                        </button>
                                                        <span className='mx-2 block'>{product?.count}</span>
                                                        <button onClick={() => updateItemCount(product?.product.id, product?.count + 1)} type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"><i className="fa-solid fa-plus"></i></button>
                                                    </div>
                                                    <div className="text-end md:order-4 md:w-32">
                                                        <p className="text-base font-bold text-gray-900">{product?.price} EGP</p>
                                                    </div>
                                                </div>
                                                <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                                    <a href="#" className="text-base font-medium text-gray-900 hover:underline">{product?.product.title}</a>
                                                    <div className="flex items-center gap-4">
                                                        <button type="button" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"><i className='fa-solid fa-heart pr-2'></i>Add to Favorites</button>
                                                        <button onClick={() => removeCartItem(product?.product.id)} type="button" className="inline-flex items-center text-sm font-medium text-red-600 hover:underline">Remove </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                                <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                                    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                                        <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <dl className="flex items-center justify-between gap-4">
                                                    <dt className="text-base font-normal text-gray-500">Original price</dt>
                                                    <dd className="text-base font-medium text-gray-900">{cartItems?.data?.totalCartPrice} EGP</dd>
                                                </dl>
                                            </div>
                                            <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                                <dt className="text-base font-bold text-gray-900">Total</dt>
                                                <dd className="text-base font-bold text-gray-900">{cartItems?.data?.totalCartPrice} EGP</dd>
                                            </dl>
                                        </div>
                                        <Link to="/checkout" className="flex w-full items-center justify-center rounded-lg bg-slate-700 px-5 py-2.5 text-sm font-medium text-slate-50 hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 ">Proceed to Checkout</Link>
                                        <div className="flex items-center justify-center gap-2">
                                            <span className="text-sm font-normal text-gray-500"> or </span>
                                            <Link to={'/'} title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline">Continue Shopping <i className="fa-solid fa-arrow-right"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </section>
        </>
    )
}
