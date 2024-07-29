import { useContext, useEffect } from "react"
import { wishListContext } from "../../Context/WishListContext"
import { CartContext } from "../../Context/CartContext"

export default function whishList() {
    const { wishList, getWishListItems, removeWishListItem } = useContext(wishListContext)
    const { addProductToCart } = useContext(CartContext)

    useEffect(() => {
        getWishListItems()
    }, [])

    return (
        <>
            <section className="pt-12">
                {wishList?.data?.map((item) =>
                    <div key={item?._id} className="grid grid-cols-12 gap-5 border border-slate-700 p-5">
                        <div className="col-span-3">
                            <img src={item?.imageCover} className="w-full h-[250px] object-contain shadow-md" alt={item?.title} />
                        </div>
                        <div className="col-span-9 shadow-md p-3">
                            <div className="flex justify-between items-center">
                                <h2 className="md:text-3xl font-semibold text-slate-600">{item?.title}</h2>
                                <button type="button" onClick={() => removeWishListItem(item?._id)} className="font-semibold text-red-700">Remove</button>
                            </div>
                            <p className="md:text-xl text-slate-400 my-5">{item?.description}</p>
                            <div className="flex justify-between mt-6">
                                <span className="block text-xl">{item?.price} EGP</span>
                                <span className="block text-xl"> <i className="fa-solid fa-star text-yellow-400 pr-2"></i>{item?.ratingsAverage}</span>
                            </div>
                            <div className="mt-5">
                                <button onClick={() => addProductToCart(item?.id)} className='w-full bg-slate-500 hover:bg-slate-700 duration-200 transition-all text-slate-50 py-1 rounded-md'>Add to bag</button>
                            </div>
                        </div>
                    </div>)}
            </section>
        </>
    )
}
