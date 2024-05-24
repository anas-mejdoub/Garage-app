import React, { useState } from 'react'
import Checkbox from '../../Components/Checkbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { Inertia } from '@inertiajs/inertia';

const Modal = ({ children, onClose }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-screen bg-gray-500 bg-opacity-50 flex justify-center items-center"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-4 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

const RepairRequests = ({ repairs, mechanics }) => {
    // console.log(repairs);
    console.log(mechanics);
    const [selectedMechanic, setSelectedMechanic] = useState(mechanics[0].id);
    const [selectedRepair, setSelectedRepair] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [isDateModalOpen, setIsDateModalOpen] = useState(false);

    const openDateModal = (repairId) => {
        setSelectedRepair(repairId);
        setIsDateModalOpen(true);
    };
    const getNameById = (id) =>{
        console.log(id);
        console.log(mechanics)
        const mechanic = mechanics.find((mechanic) => mechanic.id == id);
        return mechanic ? mechanic.name : 'Not found';
    }
    const closeDateModal = () => {
        setIsDateModalOpen(false);
    };

    const handleDateChange = (event) => {
        event.preventDefault();
        // Handle the date change here
        // You might want to make a POST request to your backend to update the dates
        Inertia.post('/admin/repairs/requests/update-dates', { selectedRepair, startDate, endDate });
        closeDateModal();
    };

    const handleSelectMechanic = (event) => {
        setSelectedMechanic(event.target.value);
    };

    const handleForwardRequest = (repairId, mechanicId) => {
        setSelectedRepair(repairId);

        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };
    const forwardAndClose = () => {
        console.log(selectedMechanic);
        console.log(selectedRepair);
        Inertia.post('/admin/repairs/requests/forward', { selectedMechanic, selectedRepair});
        setIsModalOpen(false);
    };

    return (
        <div className="p-6  flex flex-col gap-4 items-center">
            <h1 className="text-5xl font-semibold text-gray-800 leading-tight mb-6">Repair Requests</h1>
            <div className="max-w-2xl w-[60em] p-6 bg-white rounded-lg">
                <div className="relative inline-flex w-full justify-center mb-6">
                    <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.762-9.763 25.591 0 35.354l189.21 189.209c9.372 9.373 24.749 9.373 34.121 0l189.21-189.209c9.763-9.763 9.763-25.592 0-35.354-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fill-rule="nonzero"/></svg>
                </div>
                <ul className="divide-y divide-gray-200">
                    {repairs.map((repair, index) => (
                        <li key={index} className="shadow-lg p-4 flex flex-col items-center justify-center gap-4 py-4">
                            <div className="flex flex-col gap-4 justify-between">
                                <h1 className="text-2xl font-semibold text-gray-700">
                                    Request ID: {repair.id}
                                    {/* <Checkbox /> */}
                                </h1>
                                <select onChange={handleSelectMechanic}
                                        className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none w-full">
                                    {mechanics.map((mechanic, index) => (
                                        <option key={index} value={mechanic.id}>{mechanic.name}</option>
                                    ))}
                                </select>
                            </div>
                            <p className="text-2xl text-gray-600">{repair.description}</p>
                            <div className="flex items-center">
                                {repair.status === 'completed' ? (
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        className="text-green-500 mr-2"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faExclamationCircle}
                                        className="text-yellow-500 mr-2"
                                    />
                                )}
                                <p className="text-2xl text-gray-700">Status: {repair.status}</p>
                                <br/>

                                {/* <br /> */}
                            </div>
                                <div>

                                <p className="text-2xl text-gray-700">Mechanic Name: {getNameById( repair.mechanicID)}</p>
                                </div>
                            <div>

                            <button
                                onClick={() => openDateModal(repair.id)}
                                className="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
                            >
                                Change Dates
                            </button>
                            <button
                                onClick={() => handleForwardRequest(repair.id, selectedMechanic)}
                                className="text-lg text-red-500 border-red-500 bg-white font-bold py-2 px-4 rounded border hover:bg-red-50"
                            >
                                Forward to Mechanic
                            </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {isModalOpen && (
                <Modal onClose={handleModalClose}>
                    <h2 className="text-lg font-semibold text-gray-700">
                    Forwarding Request {selectedRepair} to Mechanic {getNameById(selectedMechanic)}
                    </h2>
                    <p className="text-gray-600">
                        Are you sure you want to forward this request to the selected mechanic?
                    </p>
                    <div className="flex justify-end">
                        <button
                            onClick={handleModalClose}
                            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                // Send the request to the backend to update the repair request
                                console.log('Forwarding request...');
                                forwardAndClose();
                            }}
                            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
                        >
                            Forward
                        </button>
                    </div>
                </Modal>
            )}
            {isDateModalOpen && (
                <Modal onClose={closeDateModal}>
                    <h2 className="text-lg font-semibold text-gray-700">
                        Change Dates for Request {selectedRepair}
                    </h2>
                    <form onSubmit={handleDateChange}>
                        <div className="flex flex-col gap-4">
                            <label htmlFor="startDate" className="text-gray-600">Start Date</label>
                            <input
                                type="date"
                                id="startDate"
                                name="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none w-full"
                            />
                            <label htmlFor="endDate" className="text-gray-600">End Date</label>
                            <input
                                type="date"
                                id="endDate"
                                name="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none w-full"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={closeDateModal}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
};

export default RepairRequests;
