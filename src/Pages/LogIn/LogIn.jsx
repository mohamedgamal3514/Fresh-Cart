import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from 'YUP'
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../../Context/UserContext";


export default function LogIn() {
    const navigate = useNavigate()
    const { token, setToken } = useContext(UserContext)
    const [isLoading, setIsLoading] = useState(false)
    const signInSchema = Yup.object({
        email: Yup.string().email('Enter valid email').required('Email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Enter valid email'),
        password: Yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Enter valid password'),
    })
    async function handelSignIn(values) {
        setIsLoading(true)
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            console.log(data)
            localStorage.setItem('token', data.token)
            setToken(data.token)
            setIsLoading(false)
            toast.success('Successfuly Logedin', {
                position: 'bottom-left',
            })
            navigate('/')
        } catch (error) {
            setIsLoading(false)
            toast.error('Faild to Login', {
                position: 'bottom-left',
            })
            console.log(error)
        }
    }
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handelSignIn,
        validationSchema: signInSchema
    })
    return (
        <>
            <div className="pt-48">
                <h2 className="text-center text-slate-600 text-3xl mt-10 font-semibold">Login Now</h2>
                <form className="flex w-full flex-col gap-4 p-5 md:p-0" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email2" value="Your email" />
                        </div>
                        <TextInput id="name" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" />
                        {formik.errors.email && formik.touched.email ? <div><p className="text-red-700 mt-2">{formik.errors.email}</p></div> : null}
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password2" value="Your password" />
                        </div>
                        <TextInput id="password2" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" />
                        {formik.errors.password && formik.touched.password ? <div><p className="text-red-700 mt-2">{formik.errors.password}</p></div> : null}
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="agree" className="flex">
                            Don't have account
                            <Link to={'/register'} className="text-cyan-600 ps-2 hover:underline">
                                register now
                            </Link>
                        </Label>
                        <Label htmlFor="agree" className="flex">
                            <Link to={'/forgetPassword'} className="text-cyan-600 ps-2 hover:underline">
                                Forget Password
                            </Link>
                        </Label>
                    </div>
                    <Button type="submit">{isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : "Login to your account"}</Button>
                </form>
            </div>
        </>
    )
}
