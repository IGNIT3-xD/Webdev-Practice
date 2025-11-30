import React, { useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const centers = useLoaderData()
    // console.log(centers);
    const mapRef = useRef(null)

    const handleSearch = (e) => {
        e.preventDefault()
        const location = (e.target.location.value).toLowerCase()
        // console.log(location);
        const district = centers.find(c => c.district.toLowerCase().includes(location))
        // console.log(district);
        if (district) {
            const cordinate = [district.latitude, district.longitude]
            // console.log(cordinate);
            mapRef.current.flyTo(cordinate, 13)
        }
    }

    return (
        <div className='my-10'>
            <h1 className='text-secondary font-bold text-2xl md:text-3xl'>We are available in 64 districts</h1>
            <form onSubmit={handleSearch} className="join my-4">
                <div>
                    <label className="input validator join-item rounded-l-full">
                        <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/search--v1.png" alt="search--v1" />
                        <input type="text" name='location' placeholder="Search" />
                    </label>
                    <div className="validator-hint hidden">Search Here</div>
                </div>
                <button className="btn btn-primary text-secondary join-item rounded-r-full">Search</button>
            </form>
            <div className='my-10 w-full'>
                <MapContainer className='h-[450px] rounded-xl' ref={mapRef} center={[23.6850, 90.3563]} zoom={8} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {
                        centers.map(center =>
                            <Marker key={center.district} position={[center.latitude, center.longitude]}>
                                <Popup>
                                    <strong>{center.district}</strong> <br /> {center.covered_area.join(', ')}
                                </Popup>
                            </Marker>
                        )
                    }
                </MapContainer>
            </div>
        </div>
    );
};

export default Coverage;