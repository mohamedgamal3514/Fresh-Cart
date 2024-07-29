import imageSlider1 from '../../assets/slider-image-1.jpeg'
import imageSlider2 from '../../assets/slider-image-2.jpeg'
import imageSlider3 from '../../assets/slider-image-3.jpeg'

export default function MainSlider() {
    return (
        <>
            <section className='p-x-5'>
                <swiper-container className="bg-slate-500" style={{ height: "50%" }} speed="500" autoplay="true" loop="true" >
                    <swiper-slide className="h-1/2">
                        <img src={imageSlider1} className='w-full  h-[400px] object-containe' alt="" />
                    </swiper-slide>
                    <swiper-slide className="h-1/2">
                        <img src={imageSlider2} className='w-full h-[400px]  object-containe' alt="" />
                    </swiper-slide>
                    <swiper-slide className="h-1/2">
                        <img src={imageSlider3} className='w-full  h-[400px] object-containe' alt="" />
                    </swiper-slide>
                </swiper-container>
            </section>
        </>
    )
}
