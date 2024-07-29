import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";

export let CartContext = createContext(null)

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(null)
    const { token } = useContext(UserContext)

    async function addProductToCart(id) {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    productId: id,
                }
            }
            let { data } = await axios.request(options)
            toast.success("Product Add To Cart Successfuly")
            setCartItems(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function diplayCartItems() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "GET",
                headers: {
                    token,
                },
            }
            let { data } = await axios.request(options)
            setCartItems(data)
        } catch (error) {
            setCartItems([])
        }
    }

    async function removeCartItem(id) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "DELETE",
                headers: {
                    token,
                },
            }
            let { data } = await axios.request(options)
            if (data?.numOfCartItems === 0) {
                setCartItems([])
            } else {
                setCartItems(data)
            }
            toast.success("Product Has Been Removed Successfuly")
        } catch (error) {
            console.log(error)
        }
    }
    async function updateItemCount(id, count) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
                method: "PUT",
                headers: {
                    token,
                },
                data: {
                    count,
                }
            }
            let { data } = await axios.request(options)
            setCartItems(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function clearCart() {
        try {
            const options = {
                url: "https://ecommerce.routemisr.com/api/v1/cart",
                method: "DELETE",
                headers: {
                    token,
                }
            }
            let { data } = await axios.request(options)
            if (data?.message === "success") {
                setCartItems([])
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CartContext.Provider value={{ addProductToCart, diplayCartItems, cartItems,setCartItems, removeCartItem, updateItemCount, clearCart }}>
            {children}
        </CartContext.Provider>
    )
}