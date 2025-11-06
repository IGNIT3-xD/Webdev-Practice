import React from 'react';
import { use } from 'react';
import { AuthContext } from './../contexts/AuthContext';
// import axios from 'axios'
import Swal from 'sweetalert2';
import { useAxiosSecure } from './../hooks/useAxiosSecure';

const CreateProducts = () => {
    const { user } = use(AuthContext)
    const instance = useAxiosSecure()

    const handleCreateProduct = (e) => {
        e.preventDefault()
        const title = e.target.title.value;
        const category = e.target.category.value;
        const price_min = e.target.minPrice.value;
        const price_max = e.target.maxPrice.value;
        const condition = e.target.condition.value;
        const usage = e.target.usage.value;
        const seller_name = e.target.name.value;
        const email = e.target.email.value;
        const location = e.target.location.value;
        const status = e.target.status.value;
        const description = e.target.desc.value;
        const created_at = new Date()

        const newProduct = { title, category, price_max, price_min, condition, usage, seller_name, email, location, status, description, created_at }
        // console.log(newProduct);

        instance.post('/products', newProduct)
            .then(data => {
                console.log(data.data);
                if (data.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Your product has been created",
                        showConfirmButton: false,
                        timer: 1500
                    });

                    e.target.reset()
                }
            })
    }

    return (
        <div className='mb-10'>
            <h1 className='text-3xl font-bold text-center'>Create A <span className='text-primary'>Product</span></h1>
            <div className='card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto'>
                <form onSubmit={handleCreateProduct} className='card-body'>
                    <label className="label">Title</label>
                    <input type="text" name='title' className="input" placeholder="Product Title" />
                    <label className="label">Category</label>
                    <select defaultValue="Category" name='category' className="select appearance-none">
                        <option disabled={true}>Select a category</option>
                        <option>Apparel</option>
                        <option>Electronics</option>
                        <option>Furniture</option>
                    </select>
                    <label className="label">Min. Price</label>
                    <input type="number" name='minPrice' className="input" placeholder="Min. Price" />
                    <label className="label">Max. Price</label>
                    <input type="number" name='maxPrice' className="input" placeholder="Max. Price" />
                    <label className="label">Condition</label>
                    <select defaultValue="Condition" name='condition' className="select appearance-none">
                        <option>used</option>
                        <option>fresh</option>
                    </select>
                    <label className="label">Usage</label>
                    <input type="text" name='usage' className="input" placeholder="Usage Time" />
                    <label className="label">Seller Name</label>
                    <input type="text" name='name' readOnly className="input" defaultValue={user.displayName} />
                    <label className="label">Seller Email</label>
                    <input type="email" name='email' readOnly className="input" defaultValue={user?.email} />
                    <label className="label">Location</label>
                    <input type="text" name='location' className="input" placeholder="Location" />
                    <label className="label">Status</label>
                    <input type="text" name='status' className="input" placeholder="Status" />
                    <label className="label">Description</label>
                    <input type="text" name='desc' className="input" placeholder="Description" />
                    <button className='btn btn-primary'>Create A Product</button>
                </form>
            </div>
        </div>
    );
};

export default CreateProducts;