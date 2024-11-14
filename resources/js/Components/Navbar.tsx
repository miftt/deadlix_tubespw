import React, { FormEvent } from 'react';
import { Link } from '@inertiajs/react';
import { LogIn, LogOutIcon } from 'lucide-react';

interface NavbarProps {
    auth: any;
    onLogout: (e: FormEvent) => void;
}

export default function Navbar({ auth, onLogout }: NavbarProps) {
    return (
        <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
            <nav className="flex items-center justify-between p-4">
                <div className="text-red-600 font-bold text-2xl">DEADLIX</div>
                <div className="flex items-center space-x-4">
                    <Link href="/" className="hover:text-gray-300">Home</Link>
                    <Link href="/tv-shows" className="hover:text-gray-300">TV Shows</Link>
                    <Link href="/movies" className="hover:text-gray-300">Movies</Link>
                    <Link href="/new-popular" className="hover:text-gray-300">New & Popular</Link>
                    {auth.user ? (
                        <form onSubmit={onLogout}>
                            <button className="flex items-center hover:text-gray-300 mr-2 bg-red-600 rounded-md px-4 py-2">
                                <LogOutIcon className="mr-2" />
                                Logout
                            </button>
                        </form>
                    ) : (
                        <Link href={route('login')} className='flex items-center hover:text-gray-300 mr-2 bg-red-600 rounded-md px-4 py-2'>
                            <LogIn className="mr-2" />
                            Login
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
} 