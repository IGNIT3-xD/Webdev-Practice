import { Suspense, useEffect, useState, lazy } from "react"
import Products from './Components/Products';
import Cart from "./Components/Cart";
import { ToastContainer } from 'react-toastify';

const Product = lazy(() => import("./Components/Products"));

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('Data.json')
      .then(res => res.json())
      .then(json => setData(json))
  }, []);

  const [toggle, setToggle] = useState(true)
  const [cartProduct, setCartProducts] = useState([])
  // console.log(cartProduct);
  const removeProduct = (p) => {
    const filterData = cartProduct.filter(product => product.name !== p.name)
    setCartProducts(filterData)
  }

  return (
    <>
      <div className="flex items-center justify-between w-11/12 mx-auto my-5">
        <p className="text-2xl font-bold">{toggle ? "Products" : "Cart"}</p>
        <div>
          <button onClick={() => setToggle(true)} className={`btn font-bold ${toggle ? "btn-primary" : "text-black/60"}`}>All Products</button>
          <button onClick={() => setToggle(false)} className={`btn font-bold  ${!toggle ? "btn-primary" : "text-black/60"}`}>Cart({cartProduct.length})</button>
        </div>
      </div>
      {
        toggle ?
          <Suspense fallback={<p className="text-3xl font-bold">Loading..</p>}>
            <Products
              data={data}
              cartProduct={cartProduct}
              setCartProducts={setCartProducts}
            ></Products>
          </Suspense> :
          <Cart cartProduct={cartProduct} removeProduct={removeProduct}></Cart>
      }

      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
