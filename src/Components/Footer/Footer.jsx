import React from 'react'
import americanExp from '../../assets/American-Express-Color.png'
import payPal from '../../assets/paypal.png'
import maserCard from '../../assets/mastercard.webp'
import googlePlay from '../../assets/get-google-play.png'
import appleStore from '../../assets/get-google-play.png'

export default function Footer() {
    return (
        <>
            <footer className='bg-slate-900 text-center p-3 absolute bottom-0 left-0 right-0 '>
                <div className="container mx-auto">
                    <div className="flex flex-col lg:flex-row md:items-center  md:justify-between">
                        <div className="flex flex-col md:flex-row md:items-center gap-y-2 md:gap-y-0 md:gap-x-6">
                            <h2 className="text-slate-50 text-start text-xl">Payment Partners :</h2>
                            <div className="flex gap-x-4 items-center">
                                <img src={americanExp} className="h-8" alt="" />
                                <img src={payPal} className="h-8" alt="" />
                                <img src={maserCard} className="h-8    " alt="" />
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-0 gap-y-2 md:gap-y-0 md:gap-x-6">
                            <h2 className="text-slate-50 text-start text-xl">Download App :</h2>
                            <div className="flex gap-x-4 items-center">
                                <img src={googlePlay} className="h-8" alt="" />
                                <img src={appleStore} className="h-8" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
