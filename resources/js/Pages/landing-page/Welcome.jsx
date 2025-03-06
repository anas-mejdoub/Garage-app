import { Link, Head } from '@inertiajs/react';
import CarImg from './nissan.png'
import Logo from './logo_-removebg-preview.png'
export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="h-full">
                    {/* Nav */}
                    <div className="w-full container mx-auto">
                        <div className="w-full flex items-center justify-between">
                            <a className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="#">
                                <img src={Logo} className="w-24 h-12 mr-4" alt="Logo" />
                                Garagiste
                            </a>

                            <div className="flex w-1/2 justify-end content-center">
                                <a className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out" href="https://twitter.com/intent/tweet?url=#">
                                    Login
                                </a>
                                <a
                                    className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
                                    href="https://www.facebook.com/sharer/sharer.php?u=#"
                                >
                                    Sign Up
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Main */}
                    <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                        {/* Left Col */}
                        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                            <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                                Your Space to
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                                    Get your Repair
                                </span>
                                Easily
                            </h1>
                            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                                Get your vehicle repaired easily and efficiently with us!
                            </p>

                            <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                                <div className="mb-4">
                                    <label className="block text-blue-300 py-2 font-bold mb-2" htmlFor="emailaddress">
                                        Contact Us
                                    </label>
                                    <input
                                        className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                        id="emailaddress"
                                        type="text"
                                        placeholder="your message here..."
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-4">
                                    <button
                                        className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                                        type="button"
                                    >
                                        Send
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="w-full xl:w-3/5 p-12 overflow-hidden">
                            <img className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6" src={CarImg} alt="Car" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
