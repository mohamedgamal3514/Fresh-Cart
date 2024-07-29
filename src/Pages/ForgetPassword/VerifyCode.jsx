import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import * as Yup from 'YUP'
import axios from "axios";
import toast from "react-hot-toast";


export default function VerifyCode() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const verifyCodeSchema = Yup.object({
        resetCode: Yup.string().required('Enter Verification Code'),
    })

    async function handelVerifyCode(values) {
        setIsLoading(true)
        try {
            const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
            console.log(data)
            setIsLoading(false)
            toast.success('Reset code sent to your email', {
                position: 'bottom-left',
            })
          
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
            resetCode: '',
        },
        onSubmit: handelVerifyCode,
        validationSchema: verifyCodeSchema
    })


    return (
        <>
            <section className='py-6'>
                <h2 className='text-2xl font-semibold text-slate-700'>Code Verification</h2>
                <form className="flex w-full flex-col mt-8 gap-4 p-5 md:p-0" onSubmit={formik.handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email2" value="Verify Code" />
                        </div>
                        <TextInput id="resetCode" name="resetCode" value={formik.values.resetCode} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" />
                        {formik.errors.resetCode && formik.touched.resetCode ? <div><p className="text-red-700 mt-2">{formik.errors.resetCode}</p></div> : null}
                    </div>
                    <Button type="submit">{isLoading ? <i className="fas fa-spinner fa-spin text-xl"></i> : "Verify Code"}</Button>
                </form>
            </section>
        </>
    )
}
