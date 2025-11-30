import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import useAxiosSecure from './../../hooks/useAxiosSecure';
import { toast } from 'react-hot-toast';

const Rider = () => {
    const { register, handleSubmit, control } = useForm()
    const axiosSecure = useAxiosSecure()
    const data = useLoaderData()
    const warehouseRegions = data.map(r => r.region)
    const getRegion = [...new Set(warehouseRegions)]

    const riderRegion = useWatch({ control, name: 'riderRegion' })

    const districtByRegion = (region) => {
        const regionDistricts = data.filter(d => d.region === region)
        const district = regionDistricts.map(r => r.district)
        return district;
    }

    const handleRider = (data) => {
        // console.log(data);
        axiosSecure.post('/riders', data)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success("Riding....")
                }
            })
    }

    return (
        <div className='p-8 md:p-10 bg-white my-10 rounded-2xl'>
            <h1 className='text-secondary font-bold text-2xl md:text-4xl mb-2'>Be A Rider</h1>
            <p className='text-sm font-light text-[#606060]'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. <br /> From personal packages to business shipments — we deliver on time, every time.</p>

            <form onSubmit={handleSubmit(handleRider)}>
                <div className='my-6'>
                    <p className='font-bold text-xl'>Sender Details</p>
                    <div className='mt-8 space-y-3'>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Your Name</label>
                            <input {...register('name')} type="text" className="input font-medium w-full" placeholder="Your Name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Your Email</label>
                            <input {...register('email')} type="email" className="input font-medium w-full" placeholder="Your Email" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Your Contact No.</label>
                            <input {...register('contactNo')} type="number" className="input font-medium w-full" placeholder="Your Contact No." />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Your Nid No.</label>
                            <input {...register('nid')} type="number" className="input font-medium w-full" placeholder="Your Nid No." />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Your Region</label>
                            <select {...register('riderRegion', { required: true })} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    getRegion?.map((region, i) => <option key={i} value={region}>{region}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Pick a warehouse you want to work.</label>
                            <select {...register('riderDistrict', { required: true })} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(riderRegion).map((district, i) => <option key={i} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Sender Address</label>
                            <input {...register('senderAddress', { required: true })} type="text" className="input font-medium w-full" placeholder="Sender Address" />
                        </fieldset>
                    </div>
                </div>
                <button className='btn btn-primary text-secondary'>Be a rider</button>
            </form>
        </div>
    );
};

export default Rider;