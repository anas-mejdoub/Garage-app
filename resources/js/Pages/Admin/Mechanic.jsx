import { Inertia } from '@inertiajs/inertia';
import React from 'react';
import NavBar from './Navbar';

export default function Mechanics({ auth, mechanics , notifications}) {
    if (auth.role !== 'admin') {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl text-red-500">You do not have permission to view this page.</h1>
            </div>
        );
    }

    const deleteMechanic = (mechanicId) => {
        Inertia.delete(`/mechanics/${mechanicId}`);
    }
    console.log(auth);
    return (
        <div>
            <NavBar auth={auth} notifications={notifications} />
        <div  className="p-6" style={{ background: '#161D32', minHeight: '100vh' }}>
            <h2 className="text-2xl font-semibold  text-gray-400 leading-tight mb-4">Mechanics</h2>
            <div className="bg-gray-900 shadow sm:rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-400 mb-2">All Mechanics:</h3>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-white-400 text-left text-sm font-medium uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-white-400 text-left text-sm font-medium uppercase tracking-wider">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3 text-white-400 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 text-white divide-y divide-gray-700">
                        {mechanics.map(mechanic => (
                            <tr key={mechanic.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-400 font-medium">{mechanic.name}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-400">{mechanic.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap  text-sm">
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
        </div>
    );
}
