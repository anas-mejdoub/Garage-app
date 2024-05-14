import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineCar, AiOutlineSync } from 'react-icons/ai';
import Modal from 'react-modal';

const MechanicRepairs = ({ repairs, onStatusChange }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newStatus, setNewStatus] = useState("completed");
    const [currentRepair, setCurrentRepair] = useState(null);

    const openModal = (repair) => {
        setCurrentRepair(repair);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleStatusChange = (status) => {
        closeModal();
    };
    const handleSubmit = (event) =>{
        // onStatusChange(newStatus);
        console.log(newStatus)
        event.preventDefault();
        Inertia.post('/mechanic/change/vehicle-status', {currentRepair, newStatus});
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-indigo-600 mb-6 flex items-center">
                <AiOutlineCar className="mr-2" /> Repairs assigned to me
            </h1>
            {repairs.map(repair => (
                <div key={repair.id} className="bg-white overflow-hidden shadow rounded-lg mb-6 divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6 bg-indigo-100">
                        <h2 className="text-2xl font-semibold text-indigo-600">{repair.title}</h2>
                    </div>
                    <div className="px-4 py-5 sm:p-6">
                        <p className="mt-1 max-w-2xl text-xl text-gray-700">{repair.description}</p>
                    </div>
                    <div className="px-4 py-5 sm:px-6 bg-indigo-100 flex justify-between items-center">
    <div className="flex items-center">
        {repair.status === 'completed' ? (
            <div className="text-green-500 flex items-center">
                <AiFillCheckCircle className="mr-1" /> Completed
            </div>
        ) : (
            <div className="text-red-500 flex items-center">
                <AiFillCloseCircle className="mr-1" /> Pending
            </div>
        )}
    </div>
    {repair.status !== 'completed' && (
        <button 
            className="bg-yellow-500 text-white rounded px-2 py-1 flex items-center mr-2"
        >
            <AiOutlineSync className="mr-1" /> Working on
        </button>
    )}
    <button 
        onClick={() => openModal(repair)} 
        className="bg-blue-500 text-white rounded px-2 py-1 flex items-center"
    >
        <AiOutlineSync className="mr-1" /> Change Status
    </button>
</div>
                </div>
            ))}
            <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Change Status Modal"
            className="m-auto w-11/12 md:w-1/2 lg:w-1/3 border border-gray-300 shadow-lg p-6 rounded-md bg-white"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex"
        >
            <h2 className="text-2xl font-bold mb-4">Change Status</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="status">
                        Status
                    </label>
                    <select 
                        id="status"
                        value={newStatus} 
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
                <button
                onClick={() => {handleSubmit}}
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Confirm
                </button>
            </form>
        </Modal>
        </div>
    );
};

export default MechanicRepairs;