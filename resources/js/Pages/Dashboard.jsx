import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
function Navbar() {
    return (
        <nav className="navbar pl-20">
            <ul className="flex space-x-4">
                <li className='pl-10'>
                    <a href="/add-vehicle" className="text-lg text-indigo-600 hover:text-indigo-900">Add Vehicle</a>
                </li>
                <li className='pl-10'>
                <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/my-vehicles">My Vehicles</InertiaLink>
                </li>
                <li className='pl-10'>
                <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/select-vehicle">repair-request</InertiaLink>
                </li>
                <li className='pl-10'>
                <InertiaLink className="text-lg text-indigo-600 hover:text-indigo-900" href="/repairs-history">repairs-history</InertiaLink>
                </li>
            </ul>
        </nav>
    );
}

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<><h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2></>}
        >
            <Head title="Dashboard" />
            <Navbar />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* <div className="p-6 text-gray-900">You're logged in!</div> */}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
