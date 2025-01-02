import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import { User } from '@/types';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { BookmarkPlus, PlayCircle, Search } from 'lucide-react';
import axios from 'axios';
import { Movie } from '@/types/movie';
import SearchResults from './SearchResult';
import { Toaster } from 'sonner';

interface NavbarProps {
    user: User;
}

export default function Navbar({ user }: NavbarProps) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    // Handle click outside search results
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                performSearch();
            } else {
                setSearchResults([]);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const performSearch = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`/api/movies/search?query=${searchQuery}`);
            setSearchResults(response.data.results);
            setShowResults(true);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Toaster richColors position='top-center' />
            <nav className="bg-black/90 backdrop-blur-sm border-b border-gray-800/50 fixed top-0 w-full z-50">
                <div className="max-w-[110rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Section: Logo & Nav Links */}
                        <div className="flex items-center flex-1">
                            {/* Logo */}
                            <div className="flex-shrink-0">
                                <Link href="/" className="flex items-center">
                                    <PlayCircle size={32} className="mr-1 text-red-500" />
                                    <span className="text-white text-xl font-bold">Deadflix</span>
                                </Link>
                            </div>

                            {/* Navigation Links */}
                            <div className="hidden md:flex ml-8 space-x-4">
                                <Link
                                    href={route('home')}
                                    className="text-gray-300 text-sm font-medium hover:text-white transition-colors px-3 py-2"
                                >
                                    Home
                                </Link>
                                <Link
                                    href='/movies'
                                    className="text-gray-300 text-sm font-medium hover:text-white transition-colors px-3 py-2"
                                >
                                    Movies
                                </Link>
                                <Link
                                    href='/watchlist'
                                    className="text-gray-300 text-sm font-medium hover:text-white flex items-center space-x-1.5 transition-colors px-3 py-2"
                                >
                                    <BookmarkPlus size={16} />
                                    <span>Watchlist</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Section: Search & User Menu */}
                        <div className="flex items-center space-x-6">
                            {/* Search Bar */}
                            <div className="hidden sm:block relative" ref={searchRef}>
                                <div className="relative group">
                                    <div className="flex items-center bg-transparent focus-within:bg-[#141414] 
                                          transition-all duration-200">
                                        <Search
                                            className="mr-1 text-gray-400 group-focus-within:text-gray-300 transition-colors duration-200"
                                            size={18}
                                        />
                                        <input
                                            type="text"
                                            className="w-[200px] bg-transparent text-white pl-3 pr-4 py-1.5
                                                  focus:w-[260px] outline-none   
                                                  focus:ring-0  
                                                  focus:border-transparent  
                                                  placeholder:text-gray-400 text-sm appearance-none
                                                 transition-all duration-200"
                                            placeholder="Search for movies..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            spellCheck={false}
                                        />
                                    </div>
                                </div>

                                {/* Search Results Dropdown */}
                                {(showResults || isLoading) && (
                                    <div className="absolute right-0 w-[350px] mt-2">
                                        <SearchResults results={searchResults} isLoading={isLoading} />
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu & Search Toggle */}
                            <div className="flex items-center sm:hidden">
                                <button
                                    onClick={() => setShowMobileSearch(!showMobileSearch)}
                                    className="p-2 text-gray-400 hover:text-white transition-colors"
                                >
                                    <Search size={20} />
                                </button>
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="p-2 text-gray-400 hover:text-white transition-colors ml-2"
                                >
                                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        {showingNavigationDropdown ? (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>

                            {/* User Menu */}
                            <div className="hidden sm:block">
                                {user ? (
                                    <div className="relative">
                                        <Dropdown>
                                            <Dropdown.Trigger>
                                                <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                                    <span className="text-sm">{user.name}</span>
                                                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>

                                            <Dropdown.Content>
                                                <Dropdown.Link href={route('dashboard')}>Dashboard</Dropdown.Link>
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
                                            className="text-gray-300 text-sm hover:text-white transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white text-sm font-medium transition-colors"
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                {showMobileSearch && (
                    <div className="sm:hidden px-4 pb-3">
                        <div className="relative" ref={searchRef}>
                            <div className="relative group">
                                <div className="flex items-center bg-[#141414] rounded-md">
                                    <Search
                                        className="ml-3 text-gray-400"
                                        size={18}
                                    />
                                    <input
                                        type="text"
                                        className="w-full bg-transparent text-white pl-3 pr-4 py-2
                                             outline-none border-none
                                             placeholder:text-gray-400 text-sm appearance-none"
                                        placeholder="Search for movies..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        spellCheck={false}
                                    />
                                </div>
                            </div>

                            {/* Mobile Search Results Dropdown */}
                            {(showResults || isLoading) && (
                                <div className="absolute left-0 right-0 mt-2">
                                    <SearchResults results={searchResults} isLoading={isLoading} />
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Mobile Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href='/'>
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href='/movies'>
                            Movies
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href='/watchlist'>
                            Watchlist
                        </ResponsiveNavLink>
                    </div>

                    {/* Responsive Settings Options */}
                    {user ? (
                        <div className="pt-4 pb-1 border-t border-gray-700">
                            <div className="px-4">
                                <div className="font-medium text-base text-gray-300">{user.name}</div>
                                <div className="font-medium text-sm text-gray-400">{user.email}</div>
                            </div>

                            <div className="mt-3 space-y-1">
                                <ResponsiveNavLink href={route('dashboard')}>Dashboard</ResponsiveNavLink>
                                <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 pb-1 border-t border-gray-700">
                            <div className="space-y-1">
                                <ResponsiveNavLink href={route('login')}>Log in</ResponsiveNavLink>
                                <ResponsiveNavLink href={route('register')}>Sign up</ResponsiveNavLink>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}