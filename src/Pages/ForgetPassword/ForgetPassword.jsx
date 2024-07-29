import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from 'YUP'
import axios from "axios";
import toast from "react-hot-toast";
export default function ForgetPassword() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const forgetPasswordSchema = Yup.object({
        email: Yup.string().email('Enter valid email').required('Email is required').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Enter valid email'),
    })

    async function handelForgetPassword(values) {
        setIsLoading(true)
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
            console.log(data)
            setIsLoading(false)
            toast.success('Reset code sent to your email', {
                position: 'bottom-left',
            })
            if (data.statusMsg == "success") {
                navigate("/verifyCode")
            }
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
        },
        onSubmit: handelForgetPassword,
        validationSchema: forgetPasswordSchema
    })



    return (
        <>
            <section className='py-6'>
                <h2 className='text-2xl font-semibold text-slate-700'>Forget Your Password</h2>
                <form className="flex w-full flex-col mt-8 gap-4 p-5 md:p-0" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email2" value="Your email" />
                        </div>
                        <TextInput id="name" name="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" />
                        {formik.errors.email && formik.touched.email ? <div><p className="text-red-700 mt-2">{formik.errors.email}</p></div> : null}
                    </div>
                    <Button type="submit">{isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : "Reset You Password"}</Button>
                </form>
            </section>
        </>
    )
}
