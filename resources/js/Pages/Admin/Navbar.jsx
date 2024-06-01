import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useState, useEffect, useRef } from 'react';
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
import logo from './logo_-removebg-preview.png';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
function NavBar({ auth, notifications }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const dsh = '/ndashboard/' + auth.id;
    const img = `https://api.dicebear.com/8.x/thumbs/svg?seed=${auth.name}`;
    const handleNotificationClick = () => {
        setModalVisible(true);
    }
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Garagiste</span>
                </a>

                <div className="flex items-center space-x-9">
                    <FaBell
                        onClick={handleNotificationClick}
                        className="text-gray-400  hover:text-gray-100 cursor-pointer"
                    />
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
                                    </li><li>
                                        <a href={dsh} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                                    </li>

                                    <li>
                                        <Dropdown.Link className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

            </div>
            {isModalVisible && <Modal messages={notifications} onClose={() => setModalVisible(false)} />}
        </nav>
    );
}
export default NavBar;