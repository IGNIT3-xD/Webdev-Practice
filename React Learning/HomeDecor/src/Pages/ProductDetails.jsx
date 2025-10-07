import { useNavigate, useParams } from 'react-router';
import useData from '../Components/useData';
import { addWishlist } from '../Utilities/Wishlist';

const ProductDetails = () => {
    const { id } = useParams()
    const { data, loading } = useData()
    const navigate = useNavigate()

    const product = data.find(product => product.id === parseInt(id))
    // console.log(product);

    if (loading) {
        return <h1 className='text-2xl text-center my-20 font-medium'>Loading...</h1>
    }

    const handleWishlist = () => {
        // console.log(id);
        addWishlist(product.id)
    }

    return (
        <div className='my-5'>
            <div className="card card-side bg-base-100 shadow-sm max-h-96">
                <figure>
                    <img src={product.image} />
                </figure>
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold">{product.name}</h2>
                    <p className='text-xl text-black/60'>{product.description}</p>
                    <p className='text-blue-600 text-xl'>{product.category}</p>
                    <p className='text-xl font-bold'>{product.price}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => navigate(-1)} className="btn btn-outline">Go Back</button>
                        <button onClick={handleWishlist} className="btn btn-primary">Wishlist</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;