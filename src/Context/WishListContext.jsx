import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const wishListContext = createContext(null)
export default function WishListProvider({ children }) {
    const [wishList, setWishList] = useState([])
    async function addToWishList(id) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: "POST",
                headers: {
                    token: localStorage.getItem("token")
                },
                data: {
                    productId: id,
                }
            }
            const { data } = await axios.request(options)
            setWishList(data)
            toast.success("Product added successfuly to wish List Items")
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function getWishListItems() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: "GET",
                headers: {
                    token: localStorage.getItem("token")
                },
            }
            const { data } = await axios.request(options)
            console.log(data)
            setWishList(data)
        } catch (error) {
            console.log(error)
        }
    }
    async function removeWishListItem(id) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                method: "DELETE",
                headers: {
                    token: localStorage.getItem("token")
                }
            }
            let { data } = await axios.request(options)
            toast.success("Product Has Been Removed Successfuly")
            console.log(data)
            setWishList(data)
        } catch (error) {
            console.log(error)
        }
    }



    return (
        <wishListContext.Provider value={{ addToWishList, wishList, setWishList, getWishListItems, removeWishListItem }}>
            {children}
        </wishListContext.Provider>
    )
}