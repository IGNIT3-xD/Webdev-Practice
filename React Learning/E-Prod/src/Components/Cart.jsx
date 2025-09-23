const Cart = ({ cartProduct, removeProduct }) => {

    const totalPrice = cartProduct.reduce((total, product) => {
        const productPrice = parseFloat(product.price.replace(/[^0-9.]/g, ""));
        return total + (productPrice * product.quantity);
    }, 0)

    return (
        <div className='w-11/12 mx-auto my-10'>
            {
                cartProduct.map(product => <ProductInfo
                    key={product.id}
                    product={product}
                    removeProduct={removeProduct}
                ></ProductInfo>)
            }

            <p className='font-bold text-2xl'>Total: <span>{totalPrice}</span>$</p>
        </div>
    );
};

const ProductInfo = ({ product, removeProduct }) => {
    const { img, name, price } = product;

    return (
        <div className='border border-gray-300 rounded-sm flex items-center justify-between my-5 p-2'>
            <div className='flex items-center gap-4'>
                <img className='w-22' src={img} alt="" />
                <div className='font-bold'>
                    <p>{name}</p>
                    <p>{price}</p>
                    <p className="font-medium mt-2">{product.quantity} x {price}</p>
                </div>
            </div>
            <div>
                <button onClick={() => { removeProduct(product) }} className='btn'>X</button>
            </div>
        </div >
    )
}

export default Cart;