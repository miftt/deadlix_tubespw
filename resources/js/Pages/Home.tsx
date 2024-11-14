import React from 'react'
import { Head, useForm } from '@inertiajs/react'
import { ChevronRight, Play, Info, LogIn, LogOut } from 'lucide-react'
import { PageProps } from '@/types'

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
    }
    categories: Category[]
    auth: PageProps
}

export default function Welcome({ featuredContent, categories, auth }: HomeProps) {
    const { post } = useForm();
    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('logout'));
    };

    return (
        <>
            <Head title="Home - Deadlix" />
            <div className="min-h-screen bg-black text-white">
                {/* Header */}
                <header className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-transparent">
                    <nav className="flex items-center justify-between p-4">
                        <img src="/images/deadlix-logo.png" alt="Netflix" className="h-8" />
                        <div className="flex items-center space-x-4">
                            <a href="#" className="hover:text-gray-300">Home</a>
                            <a href="#" className="hover:text-gray-300">TV Shows</a>
                            <a href="#" className="hover:text-gray-300">Movies</a>
                            <a href="#" className="hover:text-gray-300">New & Popular</a>
                            {auth.user ? (
                                <form onSubmit={handleLogout}>
                                    <button
                                        type="submit"
                                        className='flex items-center hover:text-gray-300 mr-2 bg-red-600 rounded-md px-4 py-2'
                                    >
                                        <LogOut className="mr-2" />
                                        Logout
                                    </button>
                                </form>
                            ) : (
                                <a
                                    href={route('login')}
                                    className='flex items-center hover:text-gray-300 mr-2 bg-red-600 rounded-md px-4 py-2'
                                >
                                    <LogIn className="mr-2" />
                                    Login
                                </a>
                            )}

                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
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

                {/* Movie Rows */}
                <section className="mt-8 space-y-8 px-16">
                    {categories.map((category) => (
                        <div key={category.id}>
                            <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
                            <div className="flex space-x-4 overflow-x-auto pb-4">
                                {category.movies.map((movie) => (
                                    <div key={movie.id} className="flex-shrink-0">
                                        <img
                                            src={movie.imageUrl}
                                            alt={movie.title}
                                            className="w-40 h-60 object-cover rounded transition duration-300 transform hover:scale-110"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>

                {/* Footer */}
                <footer className="mt-16 p-8 text-center text-gray-500">
                    <p>&copy; 2024 Deadlix. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}