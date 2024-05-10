import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

const RepairRequests = ({ repairs }) => {
    return (
        <div className="p-6 flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <h1 className="text-5xl font-semibold text-gray-800 leading-tight mb-6">Repair Requests</h1>
                {repairs.map((repair, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg p-16">
                        <h2 className="text-3xl font-semibold text-gray-700 mb-2">Request ID: {repair.id}</h2>
                        <p className="text-xl text-gray-600 mb-2">Description: {repair.description}</p>
                        <div className="flex items-center">
                            {repair.status === 'completed' ? (
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mr-2" />
                            ) : (
                                <FontAwesomeIcon icon={faExclamationCircle} className="text-yellow-500 mr-2" />
                            )}
                            <p className="text-xl text-gray-700">Status: {repair.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RepairRequests