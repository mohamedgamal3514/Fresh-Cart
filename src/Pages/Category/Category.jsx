import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "../../Components/Loading/Loading"


export default function Category() {
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(false)
  async function getCategory() {
    try {
      setLoading(true)
      const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
      setCategory(data.data)
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
          {category?.map((cat) => {
            return <div className="col-span-3" key={cat?._id}>
              <img src={cat?.image} alt={cat?.name} className="w-full h-[400px]" />
              <h2 className="text-slate-600 text-2xl text-center">{cat?.name}</h2>
            </div>
          })}
        </div>
      </section>}
    </>
  )
}
