import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { User } from '@/types';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { BookmarkPlus, PlayCircle } from 'lucide-react';

interface NavbarProps {
    user: User;
}

export default function Navbar({ user }: NavbarProps) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <nav className="bg-black border-b border-gray-800 fixed top-0 w-full z-50">
            <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <PlayCircle size={32} className="mr-1 text-red-500" />
                                <span className="text-white text-xl font-bold">Deadflix</span>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="ml-6 flex space-x-2">
                            <Link
                                href={route('home')}
                                className="text-white text-md hover:text-red-500 transition-colors px-2 py-2"
                            >
                                Home
                            </Link>
                            <Link
                                href={route('movies')}
                                className="text-white text-md hover:text-red-500 transition-colors px-2 py-2"
                            >
                                Movies
                            </Link>
                            <Link
                                href={route('watchlist')}
                                className="text-white text-md hover:text-red-500 flex items-center space-x-1 transition-colors px-2 py-2"
                            >
                                <BookmarkPlus size={18} />
                                Watchlist
                            </Link>
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                        {user ? (
                            <div className="ml-3 relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-300 hover:text-gray-100 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}
                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('login')}
                                    className="text-gray-300 hover:text-white"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Hamburger */}
                    <div className="-mr-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Responsive Navigation Menu */}
            <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                <div className="pt-2 pb-3 space-y-1">
                    <ResponsiveNavLink href={route('home')} active={route().current('home')}>
                        Home
                    </ResponsiveNavLink>
                    <ResponsiveNavLink href={route('movies')} active={route().current('movies')}>
                        Movies
                    </ResponsiveNavLink>
                </div>

                {/* Responsive Settings Options */}
                {user ? (
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-300">{user.name}</div>
                            <div className="font-medium text-sm text-gray-400">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                ) : (
                    <div className="pt-4 pb-1 border-t border-gray-200">
                        <div className="space-y-1">
                            <ResponsiveNavLink href={route('login')}>Log in</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('register')}>Sign up</ResponsiveNavLink>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}