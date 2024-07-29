import React from 'react'
import MainNavBar from '../MainNavbar/MainNavBar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'

export default function Layout() {
    return (
        <>
            <MainNavBar />
            <div className="container mx-auto py-[55px]">
                <Outlet />
            </div>
            <Footer />
        </>
    )
}
