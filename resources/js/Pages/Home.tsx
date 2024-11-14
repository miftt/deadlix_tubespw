import React, { FormEvent } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { PageProps } from '@/types'
import { useState, useRef, useEffect } from 'react';
import Navbar from '@/Components/Navbar';
import SearchBar from '@/Components/SearchBar';
import HeroSection from '@/Components/HeroSection';
import MovieGrid from '@/Components/MovieGrid';
import MovieRow from '@/Components/MovieRow';

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
            <Head title="Home - Deadlix" />
            <div className="min-h-screen bg-black text-white">
                {isSearchBarFloating && isSearching && (
                    <div className="fixed top-16 left-0 right-0 z-40 transform transition-transform duration-300">
                        <SearchBar
                            query={data.query}
                            onChange={handleSearchChange}
                            onSubmit={handleSearch}
                            isFloating={true}
                        />
                    </div>
                )}

                <Navbar auth={auth} onLogout={handleLogout} />

                <HeroSection
                    featuredContent={featuredContent}
                    searchBarProps={{
                        query: data.query,
                        onChange: handleSearchChange,
                        onSubmit: handleSearch,
                        isSearchBarFloating
                    }}
                />

                {searchResults && searchResults.length > 0 && (
                    <section className="mt-8 px-16">
                        <MovieGrid title="Search Results" movies={searchResults} />
                    </section>
                )}

                <section ref={searchResultsRef} className="mt-8 space-y-8 px-16">
                    {isSearching ? (
                        <MovieGrid
                            title="Search Results"
                            movies={filteredMovies}
                        />
                    ) : (
                        categories.map((category) => (
                            <MovieRow
                                key={category.id}
                                title={category.name}
                                movies={category.movies}
                            />
                        ))
                    )}
                </section>

                <footer className="mt-16 p-8 text-center text-gray-500">
                    <p>&copy; 2024 Deadlix. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}