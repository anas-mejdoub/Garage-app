import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';

import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
function Sidebar() {
    return (
        <div className="w-64 min-h-screen bg-gray-200 p-6">
            <ul className="space-y-4">
                <li>
                    <a href="/add-vehicle" className="text-lg text-indigo-600 hover:text-indigo-900">Add Vehicle</a>
                </li>
                <li>
                    <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/my-vehicles">My Vehicles</InertiaLink>
                </li>
                <li>
                    <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/select-vehicle">repair-request</InertiaLink>
                </li>
                <li>
                    <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/repairs-history">repairs-history</InertiaLink>
                </li>
            </ul>
        </div>
    );
}

export default function Dashboard({ auth }) {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <>
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>
                    {/* <FaBars 
                        onClick={() => setSidebarVisible(!isSidebarVisible)}
                        className="ml-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                    /> */}
                </>
            }
        >
            <Head title="Dashboard" />
            <div className="flex">
            <Sidebar/>
                <div className="py-12 flex-grow">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            {/* <div className="p-6 text-gray-900">You're logged in!</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}