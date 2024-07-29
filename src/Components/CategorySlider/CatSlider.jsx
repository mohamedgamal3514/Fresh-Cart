import axios from "axios"
import { useEffect, useState } from "react"

export default function CatSlider() {
    const [category, setCategory] = useState(null)

    async function getCat() {
        try {
            const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            setCategory(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCat()
    }, [])

    return (
        <>
            <section className="p-x-5">
                <h2 className=" text-2xl text-slate-600 mt-10 mb-2">Discover Popular Catergories</h2>
                <swiper-container slides-per-view="4" speed="500" autoplay="true">
                    {category?.map((cat) => <swiper-slide key={cat?._id} >
                        <div className="cursor-pointer" >
                            <img src={cat.image} className="w-full h-[150px] md:h-[300px]" alt="" />
                            <h3 className="text-slate-500 text-sm md:text-lg pt-1 text-center">{cat.name}</h3>
                        </div>
                    </swiper-slide>)}
                </swiper-container>
            </section >
        </>
    )
}
