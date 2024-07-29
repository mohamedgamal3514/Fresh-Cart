import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../../Components/Loading/Loading"


export default function Category() {
  const [brands, setBrands] = useState(null)
  const [loading, setLoading] = useState(false)
  async function getCategory() {
    try {
      setLoading(true)
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      setBrands(data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])
  return (
    <>
      {loading ? <Loading /> : <section className="mt-10">
        <div className="grid grid-cols-12 gap-4">
          {brands?.map((brand) => {
            return <div className="col-span-2 shadow-md" key={brand?._id}>
              <img src={brand?.image} alt={brand?.name} className="w-full h-[200px]" />
              <h2 className="text-slate-600 text-2xl text-center pb-2">{brand?.name}</h2>
            </div>
          })}
        </div>
      </section>}
    </>
  )
}
