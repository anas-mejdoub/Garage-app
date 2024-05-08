import { Inertia } from '@inertiajs/inertia';
import React from 'react';

export default function Mechanics({ auth, mechanics }) {
    if (auth.user.role !== 'admin') {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl text-red-500">You do not have permission to view this page.</h1>
            </div>
        );
    }

    const deleteMechanic = (mechanicId) => {
        Inertia.delete(`/mechanics/${mechanicId}`);
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 leading-tight mb-4">Mechanics</h2>
            <div className="bg-white shadow sm:rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">All Mechanics:</h3>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Delete</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {mechanics.map(mechanic => (
                            <tr key={mechanic.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{mechanic.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{mechanic.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => deleteMechanic(mechanic.id)} className="text-red-600 hover:text-red-900">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}