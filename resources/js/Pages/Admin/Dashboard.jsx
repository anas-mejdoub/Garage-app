import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { Inertia } from '@inertiajs/inertia';
import { Head } from '@inertiajs/react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
function Modal({ messages, onClose }) {
    console.log(messages)
    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={onClose}></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    {/* ... rest of your code ... */}
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Notifications
                                </h3>
                                <div className="mt-2">
                                    {messages && messages.length > 0 ? (
                                        messages.map((message, index) => (
                                            <div key={index}>
                                                <p className="text-sm text-gray-500">
                                                    {message.content}
                                                </p>
                                                {index < messages.length - 1 && <hr />}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500">
                                            No notifications
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}



function Sidebar() {
    return (
        <div style={{ backgroundColor: '#161D32' }} className="w-64 min-h-screen text-white p-6">
            <ul className="space-y-4">
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/add/user">Add Client</InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/add/mecanic">Add Mechanic</InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/repairs/new-requests">New Repair Request</InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/mechanics">Delete Mechanics</InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/repairs/completed">Completed Repairs</InertiaLink>
                </li>
                <li className="transition duration-300 hover:bg-gray-700 p-2 rounded">
                    <InertiaLink className="text-lg text-white hover:text-gray-200" href="/admin/repairs/requests">Pending Repairs</InertiaLink>
                </li>
            </ul>
        </div>
    );
}




function NavBar({auth}) {
    const img = `https://api.dicebear.com/8.x/thumbs/svg?seed=${auth.name}`;
    async function getImg() {
        const img = await axios.get(`https://api.dicebear.com/8.x/thumbs/svg?seed=${auth.name}`);
        // console.log(img);   
        return img;
    }
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
                </a>
                {/* <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="#" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
                        </li>
                        <li>
                            <a href="#" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                        </li>
                    </ul>
                </div> */}
                <div className="relative">
                    <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                        id="user-menu-button"
                        aria-expanded={dropdownVisible}
                        onClick={toggleDropdown}
                    >
                        <span className="sr-only">Open user menu</span>
                        
                        <img className="w-8 h-8 rounded-full" src={img} alt="user photo" />
                    </button>
                    {dropdownVisible && (
                        <div className="absolute right-0 mt-2 w-48 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                            <div className="px-4 py-3">
                                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{auth.email}</span>
                            </div>
                            <ul className="py-2" aria-labelledby="user-menu-button">
                                
                                <li>
                                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                                </li>
                                
                                <li>
                                    {/* <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                                     */}
                                     <Dropdown.Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
                
            </div>
        </nav>
    );
}






export default function MiniDsh({ auth, notifications, repair, repairs }) {
    async function getImg() {
        const img = await axios.get(`https://api.dicebear.com/8.x/thumbs/svg?seed=${auth.name}`);
        console.log(img);   
    }
    getImg();
    // if (!repair)
    let reps = repairs || [
        {
            id: 0,
            description: "",
            status: "",
            clientNotes: "",
            created_at: "",
            endDate: "",
            mechanicID: 0,
            mechanicNotes: "",
            startDate: "",
            updated_at: "",
            vehicleID: 0
        }
    ];
    let rep = repair || {
        id: 0,
        description: "",
        status: "",
        clientNotes: "",
        created_at: "",
        endDate: "",
        mechanicID: 0,
        mechanicNotes: "",
        startDate: "",
        updated_at: "",
        vehicleID: 0
    };
    console.log("test", repairs);
    const [isModalVisible, setModalVisible] = useState(false);

    const handleNotificationClick = () => {
        setModalVisible(true);
    }

    return (
        // 
        <div>
            <NavBar auth={auth} />

            {/* </dir> */}
            <Head title="Dashboard" />



            <div className="flex">

                {auth.role === 'admin' && <Sidebar />}
                {/* pp */}
                <div className="relative w-full h-screen">
                    <img src="/background_.jpg" alt="" className="absolute inset-0 h-full w-full object-cover z-0" />
                    <div className="py-12 flex-grow relative z-10">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                            <div className="flex flex-col gap-6">
                                <div className="bg-white opacity-85 overflow-hidden shadow-sm sm:rounded-lg">

                                    {auth.role === 'admin' && (
                                        <div className="p-6 bg-white rounded shadow">

                                            <h2 className="text-3xl font-semibold text-gray-700">Welcome, {auth.name}!</h2>
                                            <p className="mt-2 text-2xl text-gray-600"><strong>Your space To Manage Your Garage Easily !</strong> </p>
                                        </div>

                                    )}
                                </div>
                                <div className='flex gap-3'>
                                    <div className="bg-white opacity-85 overflow-hidden shadow-sm sm:rounded-lg w-full max-w-3xl md:w-1/3">
                                        {/* {auth.role === 'client' && ( */}
                                        {repair != null ?
                                            <div className="p-6 bg-white rounded shadow">
                                                <h2 className="text-3xl font-semibold text-gray-700">Latest Repair</h2>
                                                <p className="mt-2 text-2xl text-gray-600"><strong>Repair ID:</strong> {rep?.id ?? 0}</p>
                                                <p className="text-2xl text-gray-600"><strong>Description:</strong> {rep?.description ?? ""}</p>
                                                <p className="text-2xl text-gray-600"><strong>Start Date:</strong> {new Date(rep?.startDate ?? "").toLocaleDateString()}</p>
                                                <p className="text-2xl text-gray-600"><strong>End Date:</strong>{new Date(rep?.endDate ?? "").toLocaleDateString()}</p>
                                            </div>
                                            :
                                            <div className="p-6 bg-white rounded shadow flex flex-col items-center justify-center">
                                                <h2 className="text-3xl font-semibold text-gray-700">Latest Repair</h2>
                                                <p className="mt-4 text-2xl text-gray-600"><strong>No repair</strong> </p>
                                                {/* <p className="text-2xl text-gray-600"><strong>Description:</strong> {rep?.description ?? ""}</p>
                                                  <p className="text-2xl text-gray-600"><strong>Start Date:</strong> {new Date(rep?.startDate ?? "").toLocaleDateString()}</p>
                                                  <p className="text-2xl text-gray-600"><strong>End Date:</strong>{new Date(rep?.endDate ?? "").toLocaleDateString()}</p> */}
                                            </div>}
                                        {/* )} */}
                                    </div>
                                    <div className="bg-white opacity-85 overflow-hidden shadow-sm sm:rounded-lg w-full max-w-3xl md:w-1/3">
                                        {auth.role === 'admin' && reps && (
                                            <div className="p-6 bg-white rounded shadow flex ">
                                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-500 mt-2 mr-2 h-6 w-6" />
                                                <div className='flex flex-col center gap-9 md-4 items-center'>
                                                    <h2 className="text-3xl font-semibold text-gray-700">Completed Repairs</h2>
                                                    <div className='flex'>

                                                        <h1 className="text-2xl  font-semibold text-gray-700">{reps.filter((e) => e.status === 'completed').length} repair</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="bg-white opacity-85 overflow-hidden shadow-sm sm:rounded-lg w-full max-w-3xl md:w-1/3">
                                        {auth.role === 'admin' && reps && (
                                            <div className="p-6 bg-white rounded shadow flex">
                                                <FontAwesomeIcon icon={faSync} className="text-orange-500 animate-spin mt-2 mr-2 h-6 w-6" />
                                                <div className='flex flex-col center gap-9 items-center'>
                                                    <h2 className="text-3xl font-semibold text-gray-700">Pending Repairs</h2>
                                                    <div className='flex'>

                                                        <h1 className="text-2xl  font-semibold text-gray-700">{reps.filter((e) => e.status === 'pending').length} repair</h1>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
            {isModalVisible && <Modal messages={notifications} onClose={() => setModalVisible(false)} />}
        </div>
        // {/* </AuthenticatedLayout> */}
    );
}