import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const MecanicFrom = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('mecanic');

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/admin/add/mecanic', { name, email, password , role});
    };

    return (
        <div className="w-full max-w-md mx-auto mt-6 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-center mb-6">Add User</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Name:</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Email:</label>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Password:</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                </div>

                <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Add User</button>
            </form>
        </div>
    );
};

export default MecanicFrom;
