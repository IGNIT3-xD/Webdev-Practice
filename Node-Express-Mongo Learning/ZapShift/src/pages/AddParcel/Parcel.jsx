import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useAuth from './../../hooks/useAuth';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2'
import useAxiosSecure from './../../hooks/useAxiosSecure';

const Parcel = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit, control, reset } = useForm()
    const navigate = useNavigate()
    const data = useLoaderData()
    // console.log(data);
    const warehouseRegions = data.map(r => r.region)
    // console.log(warehouseRegions);
    const getRegion = [...new Set(warehouseRegions)]
    // console.log(getRegion);
    const senderRegion = useWatch({ control, name: 'senderRegion' })
    const receiverRegion = useWatch({ control, name: 'receiverRegion' })

    const districtByRegion = (region) => {
        const regionDistricts = data.filter(d => d.region === region)
        // console.log(regionDistricts);
        const district = regionDistricts.map(r => r.district)
        // console.log(district);
        return district;
    }

    // districtByRegion("Dhaka")

    const handleSendParcel = (data) => {
        // console.log(data);

        const isSameDistrict = data.senderDistrict === data.receiverDistrict
        // console.log(isSameDistrict);
        let price = 0
        const parcelWeight = parseFloat(data.parcelWeight)
        let extraWeight = parcelWeight - 3
        let extraCharge = extraWeight * 40

        if (data.docType === 'document' && isSameDistrict) {
            price = 60
        }
        else if (data.docType === 'document' && !isSameDistrict) {
            price = 80
        }
        else if (data.docType === 'non-document' && parcelWeight <= 3 && isSameDistrict) {
            price = 110
        }
        else if (data.docType === 'non-document' && parcelWeight <= 3 && !isSameDistrict) {
            price = 150
        }
        else if (data.docType === 'non-document' && parcelWeight > 3 && isSameDistrict) {
            price = 110 + extraCharge
        }
        else {
            price = 150 + extraCharge + 40
        }

        data.price = price
        data.createdAt = new Date()
        data.status = 'Pending'

        Swal.fire({
            title: "Are you sure?",
            text: `Your charge will be ${price} Tk !`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I ageee"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.post('/parcels', data)
                    .then(res => {
                        // console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "center",
                                icon: "success",
                                title: "Your parcel has been created. Please, Pay!",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            reset()
                            navigate('/dashboard/my-parcels')
                        }
                    })
                // console.log(price);
            }
        });

    }

    return (
        <form onSubmit={handleSubmit(handleSendParcel)} className='bg-white rounded-xl my-10 p-10'>
            <title>ZapShift - Add Parcel</title>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold'>Add Parcel</h1>
            <div className='my-6 border-t border-black/10'>
                <h1 className='my-6 text-xl md:text-2xl font-bold'>Enter your parcel details</h1>
                {/* Radio button */}
                <div className='space-x-6'>
                    <label>
                        <input {...register('docType')} value='document' type="radio" className="radio text-green-500" defaultChecked /> Document
                    </label>
                    <label>
                        <input {...register('docType')} value='non-document' type="radio" className="radio text-green-500" /> Non-Document
                    </label>
                </div>

                {/* Parcel info. */}
                <div className='my-6 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-20 items-center'>
                    <fieldset className="fieldset">
                        <label className="label text-[14px] font-medium text-black">Parcel Name</label>
                        <input {...register('parcelName', { required: true })} type="text" className="input font-medium w-full" placeholder="Parcel Name" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <label className="label text-[14px] font-medium text-black">Parcel Weight (Kg)</label>
                        <input {...register('parcelWeight', { required: true })} type='number' className="input font-medium w-full" placeholder="Parcel Weight" />
                    </fieldset>
                </div>
            </div>
            <div className='my-6 border-t border-black/10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 lg:gap-20'>
                {/* Sender details */}
                <div className='my-6'>
                    <p className='font-bold text-xl'>Sender Details</p>
                    <div className='mt-8 space-y-3'>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Sender Name</label>
                            <input {...register('senderName')} type="text" readOnly defaultValue={user?.displayName} className="input font-medium w-full" placeholder="Sender Name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Sender Email</label>
                            <input {...register('senderEmail')} type="email" readOnly defaultValue={user?.email} className="input font-medium w-full" placeholder="Sender Email" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Sender Contact No.</label>
                            <input {...register('senderNo')} type="number" className="input font-medium w-full" placeholder="Sender Contact No." />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Sender Pickup Warhouse</label>
                            <select {...register('senderRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    getRegion.map((region, i) => <option key={i} value={region}>{region}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Sender District</label>
                            <select {...register('senderDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(senderRegion).map((district, i) => <option key={i} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Sender Address</label>
                            <input {...register('senderAddress', { required: true })} type="text" className="input font-medium w-full" placeholder="Sender Address" />
                        </fieldset>
                    </div>
                </div>

                {/* Receiver details */}
                <div className='my-6'>
                    <p className='font-bold text-xl'>Receiver Details</p>
                    <div className='mt-8 space-y-3'>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Receiver Name</label>
                            <input {...register('receiverName', { required: true })} type="text" className="input font-medium w-full" placeholder="Receiver Name" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Receiver Email</label>
                            <input {...register('receiverEmail')} type="email" className="input font-medium w-full" placeholder="Receiver Email" />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Receiver Contact No.</label>
                            <input {...register('receiverNo')} type="number" className="input font-medium w-full" placeholder="Receiver Contact No." />
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Receiver Pickup Warhouse</label>
                            <select {...register('receiverRegion')} defaultValue="Pick a region" className="select">
                                <option disabled={true}>Pick a region</option>
                                {
                                    getRegion.map((region, i) => <option key={i} value={region}>{region}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Receiver District</label>
                            <select {...register('receiverDistrict')} defaultValue="Pick a district" className="select">
                                <option disabled={true}>Pick a district</option>
                                {
                                    districtByRegion(receiverRegion).map((district, i) => <option key={i} value={district}>{district}</option>)
                                }
                            </select>
                        </fieldset>
                        <fieldset className="fieldset">
                            <label className="label text-[14px] font-medium text-black">Receiver Address</label>
                            <input {...register('receiverAddress', { required: true })} type="text" className="input font-medium w-full" placeholder="Receiver Address" />
                        </fieldset>
                    </div>
                </div>
            </div>
            <button className='btn btn-primary text-secondary'>Send Parcel</button>
        </form>
    );
};

export default Parcel;