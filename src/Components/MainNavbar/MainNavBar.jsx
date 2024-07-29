import { Navbar } from "flowbite-react";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";


export default function MainNavBar() {
    const navigate = useNavigate()
    const { token, setToken } = useContext(UserContext)
    const { cartItems, diplayCartItems } = useContext(CartContext)


    useEffect(() => {
        diplayCartItems()
    }, [])

    function logOut() {
        localStorage.removeItem('token')
        setToken(null)
        navigate('login')
    }

    return (
        <nav className="bg-slate-900 fixed top-0 right-0 left-0 z-50">
            <Navbar rounded className="bg-transparent text-slate-100">
                <Link to={''}><h1 className="text-3xl text-slate-50 font-semibold">Fresh Cart</h1></Link>
                <div className="flex items-center md:order-2 ">
                    {token ? <> <Link to={'/cart'}>
                        <li className="list-none relative"><i className="fa-solid fa-cart-shopping text-3xl cursor-pointer"></i>
                            <span className="absolute -top-2 bg-green-500 w-6 h-6 text-sm  rounded-md -right-1 flex items-center justify-center translate-">{(cartItems === null || cartItems.length <= 0) ? "0" : cartItems.numOfCartItems}</span></li>
                    </Link>
                        <li className="mx-3 list-none cursor-pointer " onClick={logOut}><i className="fa-solid fa-right-from-bracket text-3xl pl-2"></i></li>
                        <Navbar.Toggle className="text-slate-100 ms-4 hover:bg-transparent" /></> : <><Link className="mx-3" to={'/register'}> Register</Link>
                        <Link className="mx-3 " to={'/login'}><i className="fa-solid fa-user text-slate-50 text-lg me-1"></i> Login</Link></>}
                </div>
                {token ? <Navbar.Collapse>
                    <Link to={""} className='nav-links'>Home</Link>
                    <Link to={"/wishList"} className='nav-links'>Wish List</Link>
                    <Link to={"/cart"} className='nav-links'>Cart</Link>
                    <Link to={"/category"} className='nav-links'>Categories</Link>
                    <Link to={"/brands"} className='nav-links'>Brands</Link>
                    <Link to={"/allorders"} className='nav-links'>Orders</Link>
                </Navbar.Collapse> : null}
            </Navbar>
        </nav>
    );

}

