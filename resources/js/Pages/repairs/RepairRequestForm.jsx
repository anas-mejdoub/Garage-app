import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import image from './cars_2.jpg'; 
function RepairRequestForm(props) {
    const [description, setDescription] = useState('');
    const [clientNotes, setClientNotes] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', description);
        formData.append('clientNotes', clientNotes);
        formData.append('vehicle_id', props.vehicleId);
        Inertia.post('/repair-request', formData);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-grey-500" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <form onSubmit={handleSubmit} className="w-full max-w-md mt-16 bg-gradient-to-b from-slate-950 to-slate-800 opacity-11 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-white text-center">Request a Repair</h2>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3 mb-4">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder='Description for your car situation' id="description" type="text" value={description} onChange={e => setDescription(e.target.value)} />
                    </div>
                    <div className="w-full px-3 mb-4">
                        <label className="block uppercase tracking-wide text-white text-xs font-bold mb-2" htmlFor="clientNotes">
                            Client Notes
                        </label>
                        <textarea className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" placeholder='Your notes for here' id="clientNotes" value={clientNotes} onChange={e => setClientNotes(e.target.value)} />
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition duration-500 ease-in-out hover:scale-105" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RepairRequestForm;
