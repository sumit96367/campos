import { useState, useEffect } from 'react'
import api from '../../services/api'
import toast from 'react-hot-toast'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products?limit=100')
      setProducts(data.products || [])
    } catch { toast.error('Failed to load products') }
    finally { setLoading(false) }
  }

  useEffect(() => { fetchProducts() }, [])

  const toggleActive = async (id, isActive) => {
    try {
      await api.patch(`/admin/products/${id}`, { isActive: !isActive })
      setProducts(ps => ps.map(p => p._id === id ? { ...p, isActive: !isActive } : p))
    } catch { toast.error('Update failed') }
  }

  return (
    <div className="p-8">
      <h1 className="font-serif text-3xl text-charcoal mb-8">Products</h1>
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-champagne">
                {['Name', 'Category', 'Price', 'Stock', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left eyebrow text-charcoal/50 text-[10px] pb-4 pr-6">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-champagne">
              {products.map(product => (
                <tr key={product._id} className="hover:bg-cream/50 transition-colors">
                  <td className="py-4 pr-6 font-serif text-charcoal">{product.name}</td>
                  <td className="py-4 pr-6 text-sm font-sans text-charcoal/60">{product.category}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal">${Number(product.price).toFixed(2)}</td>
                  <td className="py-4 pr-6 font-sans text-sm text-charcoal">{product.stock}</td>
                  <td className="py-4 pr-6">
                    <span className={`eyebrow text-[9px] px-2 py-1 ${product.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="py-4">
                    <button onClick={() => toggleActive(product._id, product.isActive)} className="text-xs font-sans text-gold hover:text-gold-dark transition-colors">
                      {product.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
export default AdminProducts
