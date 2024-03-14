import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const VehicleForm = () => {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [fuelType, setFuelType] = useState('');
    const [registration, setRegistration] = useState('');
    const [photos, setPhotos] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('make', make);
        formData.append('model', model);
        formData.append('fuelType', fuelType);
        formData.append('registration', registration);
        if (photos) formData.append('photos', photos, photos.name);

        Inertia.post('/vehicles', formData);
    };

    return (
        <div className="w-full max-w-sm mx-auto mt-4">
        <h1 className="text-2xl font-bold text-center mb-6">Adding Vehicle</h1>
        <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto mt-5 space-y-6 mb-10">
            <label className="block">
                <span className="text-gray-700">Make:</span>
                <input type="text" value={make} onChange={e => setMake(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </label>

            <label className="block">
                <span className="text-gray-700">Model:</span>
                <input type="text" value={model} onChange={e => setModel(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </label>

            <label className="block">
                <span className="text-gray-700">Fuel Type:</span>
                <input type="text" value={fuelType} onChange={e => setFuelType(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </label>

            <label className="block">
                <span className="text-gray-700">Registration:</span>
                <input type="text" value={registration} onChange={e => setRegistration(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
            </label>

            <label className="block">
    <span className="text-gray-700">Photos:</span>
    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M38 38L10 38 10 10l11.293 11.293a1 1 0 001.414 0l1.586-1.586a1 1 0 000-1.414L10 6h28v28z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 14l7-7 7 7m-7-7v18" />
            </svg>
            <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" onChange={e => setPhotos(e.target.files[0])} className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
            </p>
        </div>
    </div>
</label>

            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add Vehicle</button>
        </form>
        </div>
    );
};

export default VehicleForm;