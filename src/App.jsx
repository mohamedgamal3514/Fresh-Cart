import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./Pages/Home/Home"
import Layout from "./Components/Layout/Layout"
import Products from "./Pages/WishList/WishList"
import Cart from "./Pages/Cart/Cart"
import Brands from "./Pages/Brands/Brands"
import Category from "./Pages/Category/Category"
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage"
import Register from "./Pages/Register/Register"
import LogIn from "./Pages/LogIn/LogIn"
import { Toaster } from "react-hot-toast"
import UserContextProdider from "./Context/UserContext"
import ProductDetails from "./Pages/ProductDetails/ProductDetails"
import Guard from "./Components/Gurard/Guard"
import CartProvider from "./Context/CartContext"
import Checkout from "./Components/Checkout/Checkout"
import AllOrders from "./Pages/AllOrders/AllOrders"
import WishListProvider from "./Context/WishListContext"
import ForgetPassword from "./Pages/ForgetPassword/ForgetPassword"
import VerifyCode from "./Pages/ForgetPassword/VerifyCode"


function App() {
    const router = createBrowserRouter([
        {
            path: '', element: <Layout />, children: [
                { index: true, element: <Guard><Home /></Guard> },
                { path: 'wishList', element: <Guard> <Products /></Guard> },
                { path: 'cart', element: <Guard> <Cart /></Guard> },
                { path: 'brands', element: <Guard> <Brands /> </Guard> },
                { path: 'allorders', element: <Guard> <AllOrders /> </Guard> },
                { path: 'category', element: <Guard><Category /></Guard> },
                { path: 'checkout', element: <Guard> <Checkout /> </Guard> },
                { path: 'register', element: <Register /> },
                { path: 'productDetails/:id', element: <ProductDetails /> },
                { path: 'login', element: <LogIn /> },
                { path: 'forgetPassword', element: <ForgetPassword /> },
                { path: 'verifyCode', element: <VerifyCode /> },
                { path: '*', element: <Guard><NotFoundPage /></Guard> },
            ]
        }
    ])

    return (
        <>
            <UserContextProdider>
                <WishListProvider>
                    <CartProvider>
                        <RouterProvider router={router}>
                        </RouterProvider>
                        <Toaster />
                    </CartProvider>
                </WishListProvider>
            </UserContextProdider>
        </>
    )
}

export default App
