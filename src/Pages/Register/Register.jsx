import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'YUP'


export default function Register() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const registerSchema = Yup.object({
        name: Yup.string().required('Name is required').min(3, 'Min 3 letters').max(20, 'Max 20 letters'),
        email: Yup.string().email('Enter valid email').required('Email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Enter valid email'),
        phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Enter vail Egyptian number'),
        password: Yup.string().required('Password is required').matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, 'Enter valid password'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Password is not matching')
    })
    async function handleRegister(values) {
        setIsLoading(true)
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            localStorage.setItem('token', data.token)
            console.log(data.token)
            setIsLoading(false)
            navigate('/login')
        } catch (error) {
            setIsLoading(false)
        }
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
            rePassword: ''
        },
        onSubmit: handleRegister,
        validationSchema: registerSchema
    })
    return (
        <div className="md:pt-32">
            <h2 className="text-center text-slate-600 text-3xl mt-10 font-semibold">Register Now</h2>
            <form className="flex w-full flex-col gap-4 p-5 md:p-0" onSubmit={formik.handleSubmit}>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="name" value="Your Name" />
                    </div>
                    <TextInput id="name" name="name" value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" />
                    {formik.errors.name && formik.touched.name ? <div><p className="text-red-700 mt-2">{formik.errors.name}</p></div> : null}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2" value="Your email" />
                    </div>
                    <TextInput id="email2" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" placeholder="name@flowbite.com" />
                    {formik.errors.email && formik.touched.email ? <div><p className="text-red-700 mt-2">{formik.errors.email}</p></div> : null}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="phone" value="Your Phone" />
                    </div>
                    <TextInput id="phone" name="phone" value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" placeholder="" />
                    {formik.errors.phone && formik.touched.phone ? <div><p className="text-red-700 mt-2">{formik.errors.phone}</p></div> : null}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="password2" value="Your password" />
                    </div>
                    <TextInput id="password2" name="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" />
                    {formik.errors.password && formik.touched.password ? <div><p className="text-red-700 mt-2">{formik.errors.password}</p></div> : null}
                </div>
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="repeat-password" value="Repeat password" />
                    </div>
                    <TextInput id="repeat-password" name="rePassword" value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" />
                    {formik.errors.rePassword && formik.touched.rePassword ? <div><p className="text-red-700 mt-2">{formik.errors.rePassword}</p></div> : null}
                </div>
                <div className="flex items-center gap-2">
                    <Label htmlFor="agree" className="flex">
                        Already has account 
                        <Link  to={'/login'} className="text-cyan-600 ps-2  hover:underline">
                            Login
                        </Link>
                    </Label>
                </div>
                <Button type="submit">{isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : "Register new account"}</Button>
            </form>
        </div>
    )
}
