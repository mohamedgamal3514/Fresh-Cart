import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";


export default function Checkout() {
    const { cartItems, setCartItems } = useContext(CartContext)
    const { token } = useContext(UserContext)
    const [orderType, setOrderType] = useState(null)
    const navigate = useNavigate()
    async function createCashOrder(values) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartItems?.data?._id}`,
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    values
                }
            }
            let { data } = await axios.request(options)
            toast.success("Order has been created successfully")
            console.log(data)
            setCartItems([])
            setTimeout(() => {
                navigate('/allorders')
            }, 2000)
        } catch (error) {
            console.log(error)
        }
    }

    async function createOnlineOreder(values) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartItems?.data._id}?url=http://localhost:5173`,
                method: "POST",
                headers: {
                    token,
                },
                data: {
                    values
                }
            }
            let { data } = await axios.request(options)
                setCartItems([])
                window.location.href = data.session.url
        } catch (error) {
            console.log(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            shippingAddress: {
                city: '',
                phone: '',
                details: '',
            }
        },
        onSubmit: (values) => {
            if (orderType === "cash") createCashOrder(values);
            else createOnlineOreder(values);
        },
    })

    return (
        <>
            <div className="pt-20">
                <h2 className=" text-slate-600 text-3xl mb-5 font-semibold">Shipping Address</h2>
                <form className="flex w-full flex-col gap-4 p-5 md:p-0" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="City" />
                        </div>
                        <TextInput id="city" name="shippingAddress.city" value={formik.values.shippingAddress.city} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="city" value="Phone Number" />
                        </div>
                        <TextInput id="phone" name="shippingAddress.phone" value={formik.values.shippingAddress.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="details" value="Address Details" />
                        </div>
                        <Textarea rows={8} className="resize-none" id="details" name="shippingAddress.details" value={formik.values.shippingAddress.details} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" />
                    </div>
                    <div className="flex items-center gap-x-5">
                        <Button onClick={() => { setOrderType("cash") }} className="inline-block w-fit" type="submit"> "Cash Order"</Button>
                        <Button onClick={() => { setOrderType("online") }} className="inline-block w-fit" type="submit"> "Online Payment"</Button>
                    </div>
                </form>
            </div>
        </>
    )
}
