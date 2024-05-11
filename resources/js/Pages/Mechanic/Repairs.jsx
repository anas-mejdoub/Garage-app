import React from 'react';
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineCar, AiOutlineSync } from 'react-icons/ai';

const MechanicRepairs = ({ repairs, onStatusChange }) => {
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
                        <p className="mt-1 max-w-2xl text-sm text-gray-700">{repair.description}</p>
                        {/* Add more repair details here */}
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
                        <button 
                            onClick={() => onStatusChange(repair.id)} 
                            className="bg-blue-500 text-white rounded px-2 py-1 flex items-center"
                        >
                            <AiOutlineSync className="mr-1" /> Change Status
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MechanicRepairs;