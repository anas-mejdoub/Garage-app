import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Modal from 'react-modal';
import {Card} from "flowbite-react";
import {FaCar, FaCheckCircle} from "react-icons/fa";

export function Component(props) {
    return (
        <Card
            className="max-w-sm rounded overflow-hidden shadow-lg m-4"
            imgSrc={`/storage/${props.img}`}
        >
            <div className="px-6 py-4">
                <div className="flex items-center">
                    <FaCar className="mr-2"/>
                    <h5 className="font-bold text-xl mb-2 text-gray-700 dark:text-white">
                        {props.carName}
                    </h5>
                </div>
                <div className="flex items-center">
                    <FaCheckCircle className="mr-2"/>
                    <p className="text-gray-700 dark:text-gray-400 text-base">
                        {props.status}
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <button onClick={() => props.openModal(props.id)}
                            className="mt-2 px-4 py-2 bg-blue-700 text-white rounded">Select
                    </button>
                </div>
            </div>
        </Card>
    );
}

const NewRequests = ({repairs}) => {
    console.log(repairs);
    const [requests, setRequests] = useState(repairs || []);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [price, setPrice] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const status = "pending"
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedRequest, startDate, status, endDate, price);
        Inertia.post('/admin/repairs/requests/pick-dates', { selectedRequest, startDate, status, endDate, price });
        setModalIsOpen(false);
    };

    const openModal = (requestId) => {
        setSelectedRequest(requestId);
        setModalIsOpen(true);
    };
    return (
        <div className="p-6">
            {requests.length === 0 && <h1 className="text-xl font-bold">No new requests</h1>}
            {requests.length > 0 && <h1 className="text-xl font-bold">New Requests</h1>}
            {requests.map(request => (
                <div key={request.id} className="my-4 p-4 border rounded">
                    <Component openModal={openModal} img={request.vehicle_photos} id={request.id} status={request.status} carName={request.description}/>
                    {/*<button onClick={() => openModal(request.id)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Select</button>*/}
                </div>
            ))}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Request Modal"
            >
                <form onSubmit={handleSubmit} className="mt-4">
                    <label className="block">
                        <span className="text-gray-700">Start Date:</span>
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">End Date:</span>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <label className="block mt-4">
                        <span className="text-gray-700">Price:</span>
                        <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    </label>
                    <button type="submit" className="mt-4 px-4 py-2 bg-green-500 text-white rounded">Submit</button>
                </form>
            </Modal>
        </div>
    );
};

export default NewRequests;
