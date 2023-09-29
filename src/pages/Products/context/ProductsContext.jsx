import { createContext, useState } from "react";
import { data } from '../const/useGetData'

export const Products = createContext()

export default function ProductsContext ({ children }) {
  const [products, setProducts] = useState(data)
  const [productSelected, setProductSelected] = useState(null)

  const date = new Date()
  const minutos = date.getMinutes();
  const periodo = date.getHours() >= 12 ? 'PM' : 'AM';
  const horas12 = date.getHours() % 12 === 0 ? 12 : date.getHours() % 12;
  const timeFormated = `${horas12}:${minutos < 10 ? '0' : ''}${minutos} ${periodo}`;

  const addProduct = (product) => setProducts([...products, product])
  const addProductSelected = (product) => setProductSelected(product)

  function editProduct (product) {
    const found = products.find(item => item.product_code == product.product_code)
    if (found) {
      found.category = product.category
      found.colors = product.colors
      found.date_created = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`,
      found.description = product.description
      found.emailContent = product.emailContent
      found.images = product.images
      found.kids = product.kids
      found.men = product.men
      found.post = product.post
      found.product = product.product
      found.product_code = product.product_code
      found.product_sku = product.product_sku
      found.quantity = product.quantity
      found.regular_price = product.regular_price
      found.sale_label = product.sale_label
      found.sale_price = product.sale_price
      found.size = product.size
      found.taxes = product.taxes
      found.time_created = timeFormated
      found.women = product.women
    }
  }

  return (
    <Products.Provider value={{ products, addProduct, addProductSelected, productSelected, setProductSelected, editProduct }}>
      {children}
    </Products.Provider>
  )
}
