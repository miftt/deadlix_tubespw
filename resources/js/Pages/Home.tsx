import React, { FormEvent } from 'react'
import { Head, Link, useForm } from '@inertiajs/react'
import { ChevronRight, Play, Info, LogIn, LogOutIcon, Search } from 'lucide-react'
import { PageProps } from '@/types'
import { useState, useRef, useEffect } from 'react';

interface Movie {
    id: number
    title: string
    imageUrl: string
}

interface Category {
    id: number
    name: string
    movies: Movie[]
}

interface HomeProps {
    featuredContent: {
        title: string
        description: string
        imageUrl: string
    } | null
    categories: Category[]
    auth: PageProps
    searchResults?: Movie[]
}

export default function Home({ featuredContent, categories, auth, searchResults }: HomeProps) {
    const { post } = useForm();
    const { data, setData, get } = useForm({
        query: ''
    });
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchResultsRef = useRef<HTMLDivElement>(null);
    const [isSearchBarFloating, setIsSearchBarFloating] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const searchTriggerPosition = window.innerHeight * 0.7; // 70% dari tinggi viewport
            setIsSearchBarFloating(scrollPosition > searchTriggerPosition);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        setData('query', searchTerm);

        if (!searchTerm.trim()) {
            setIsSearching(false);
            setFilteredMovies([]);
            return;
        }

        setIsSearching(true);
        const allMovies = categories.flatMap(category => category.movies);
        const filtered = allMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMovies(filtered);

        setTimeout(() => {
            searchResultsRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const handleLogout = (e: FormEvent) => {
        e.preventDefault();
        post(route('logout'));
    }

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        get(route('search'));
    }

    return (
        <>
            <Head title="Home - Netflix Clone" />
            <div className="min-h-screen bg-black text-white">
                {/* Floating Search Bar - perbaikan styling */}
                {isSearchBarFloating && isSearching && (
                    <div className="fixed top-16 left-0 right-0 z-40 transform transition-transform duration-300">
                        <div>
                            <form onSubmit={handleSearch} className="relative max-w-xl mx-auto px-4">
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search movies or TV shows..."
                                        className="w-full bg-gray-900/90 text-white px-6 py-2 rounded-lg 
                                        border-2 border-gray-600 focus:border-red-600 pr-14
                                        placeholder-gray-400 text-lg
                                        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                                        value={data.query}
                                        onChange={handleSearchChange}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 p-2 hover:bg-red-600/20 rounded-full transition-colors duration-300"
                                    >
                                        <Search className="text-red-600 h-5 w-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Header - pastikan z-index lebih tinggi dari floating search bar */}
                <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
                    <nav className="flex items-center justify-between p-4">
                        <div className="text-red-600 font-bold text-2xl">DEADLIX</div>
                        <div className="flex items-center space-x-4">
                            <Link href="/" className="hover:text-gray-300">Home</Link>
                            <Link href="/tv-shows" className="hover:text-gray-300">TV Shows</Link>
                            <Link href="/movies" className="hover:text-gray-300">Movies</Link>
                            <Link href="/new-popular" className="hover:text-gray-300">New & Popular</Link>
                            {auth.user ? (
                                <form onSubmit={handleLogout}>
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

                {/* Hero Section */}
                {featuredContent && featuredContent.imageUrl && (
                    <section
                        className="relative h-screen bg-cover bg-center"
                        style={{ backgroundImage: `url(${featuredContent.imageUrl})` }}
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-60" />
                        <div className="absolute bottom-1/4 left-16 max-w-xl">
                            <h1 className="text-5xl font-bold mb-4">{featuredContent.title}</h1>
                            <p className="text-lg mb-6">{featuredContent.description}</p>
                            <div className="flex space-x-4">
                                <button className="flex items-center bg-white text-black px-6 py-2 rounded">
                                    <Play className="mr-2" />
                                    Play
                                </button>
                                <button className="flex items-center bg-gray-500 bg-opacity-70 px-6 py-2 rounded">
                                    <Info className="mr-2" />
                                    More Info
                                </button>
                            </div>
                        </div>
                    </section>
                )}

                {!featuredContent && (
                    <section className="relative h-screen bg-gray-900 flex items-center justify-center">
                        <div className="absolute inset-0">
                            <img src="/images/hero.png" alt="Hero background" className="w-full h-full object-cover opacity-50" />
                        </div>
                        <div className="relative z-10 text-center">
                            <h1 className="text-5xl font-bold text-white mb-4">Welcome to DEADLIX</h1>
                            <p className="text-xl text-gray-300 mb-8">Discover your next favorite movie or TV show</p>
                            <form onSubmit={handleSearch} className={`relative max-w-xl mx-auto transition-opacity duration-300 ${isSearchBarFloating ? 'opacity-0' : 'opacity-100'}`}>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Search movies or TV shows..."
                                        className="w-full bg-black/70 backdrop-blur-sm text-white px-6 py-4 rounded-lg 
                                        border-2 border-gray-600 focus:border-red-600 pr-14
                                        placeholder-gray-400 text-lg
                                        transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600/50"
                                        value={data.query}
                                        onChange={handleSearchChange}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-3 p-2 hover:bg-red-600/20 rounded-full transition-colors duration-300"
                                    >
                                        <Search className="text-red-600 h-6 w-6" />
                                    </button>
                                </div>
                                <p className="mt-2 text-sm text-gray-400">Press Enter to search</p>
                            </form>
                        </div>
                    </section>
                )}

                {/* Search Results */}
                {searchResults && searchResults.length > 0 && (
                    <section className="mt-8 px-16">
                        <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {searchResults.map((movie) => (
                                <div key={movie.id} className="flex-shrink-0">
                                    <img
                                        src={movie.imageUrl}
                                        alt={movie.title}
                                        className="w-full h-60 object-cover rounded transition duration-300 transform hover:scale-105"
                                        loading="lazy"
                                    />
                                    <p className="mt-2 text-sm">{movie.title}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Movie Rows */}
                <section ref={searchResultsRef} className="mt-8 space-y-8 px-16">
                    {isSearching ? (
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
                            {filteredMovies.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {filteredMovies.map((movie) => (
                                        <div key={movie.id} className="flex-shrink-0">
                                            <img
                                                src={movie.imageUrl}
                                                alt={movie.title}
                                                className="w-full h-60 object-cover rounded transition duration-300 transform hover:scale-110"
                                                loading="lazy"
                                            />
                                            <p className="mt-2 text-sm">{movie.title}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">No movies found matching your search.</p>
                            )}
                        </div>
                    ) : (
                        categories.map((category) => (
                            <div key={category.id}>
                                <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
                                <div className="flex space-x-4 overflow-x-auto pb-4">
                                    {category.movies.map((movie) => (
                                        <div key={movie.id} className="flex-shrink-0">
                                            <img
                                                src={movie.imageUrl}
                                                alt={movie.title}
                                                className="w-40 h-60 object-cover rounded transition duration-300 transform hover:scale-110"
                                                loading="lazy"
                                            />
                                            <p className="mt-2 text-sm">{movie.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </section>

                {/* Footer */}
                <footer className="mt-16 p-8 text-center text-gray-500">
                    <p>&copy; 2024 Netflix Clone. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}