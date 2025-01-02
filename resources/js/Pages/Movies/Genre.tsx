import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import MovieGrid from '@/Components/MovieGrid';
import GenreSelector from '@/Components/GenreSelector';
import Navbar from '@/Components/Navbar';
import { Play, Info } from 'lucide-react';
import { Movie } from '@/types/movie';

interface Genre {
    id: number;
    name: string;
}

interface Props {
    genres: Genre[];
    featuredMovies: Movie[];
    selectedGenre: Genre;
    movieCategories: {
        popular: Movie[];
        top_rated: Movie[];
        latest: Movie[];
        trending: Movie[];
    };
}

export default function Genre({ genres, featuredMovies, selectedGenre, movieCategories }: Props) {
   console.log(movieCategories);
    const auth = usePage().props.auth;
    const heroMovie = featuredMovies[0];

    return (
        <div className="min-h-screen bg-[#141414]">
            <Head title={`${selectedGenre?.name || 'Movies'} - Deadlix`} />
            <Navbar user={auth.user} />

            {/* Hero Section */}
            {heroMovie && (
                <div className="relative h-[85vh] w-full">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src={`https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`}
                            alt={heroMovie.title}
                            className="w-full h-full object-cover"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/60 to-[#141414]" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
                    </div>

                    {/* Hero Content */}
                    <div className="absolute bottom-[30%] left-[4%] max-w-xl">
                        <h1 className="text-6xl font-bold text-white mb-4">
                            {heroMovie.title}
                        </h1>
                        <p className="text-lg text-gray-200 mb-6 line-clamp-3">
                            {heroMovie.overview}
                        </p>
                        <div className="flex gap-3">
                        <Link href={`/movie/${heroMovie.id}`} className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                            <Play size={20} />
                            <span>Watch Now</span>
                        </Link>
                        <Link href={`/movie/${heroMovie.id}`} className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
                            <Info size={20} />
                            <span>More Info</span>
                        </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className="relative px-[4%] pb-20 -mt-32">
                {/* Genre Selector */}
                <div className="flex items-center mb-4">
                    <h2 className="text-xl font-medium text-white mr-4">Genre:</h2>
                    <GenreSelector 
                        genres={genres} 
                        selectedGenre={selectedGenre} 
                    />
                </div>

                {/* Movies Sections */}
                <div className="space-y-12">
                    {/* Trending Now */}
                    {movieCategories?.trending && (
                        <div className="mt-8">
                            <MovieGrid 
                                movies={movieCategories.trending} 
                                title={`Trending ${selectedGenre.name} Movies`}
                            />
                        </div>
                    )}

                    {/* Popular */}
                    {movieCategories?.popular && (
                        <div>
                            <MovieGrid 
                                movies={movieCategories.popular} 
                                title={`Popular ${selectedGenre.name} Movies`}
                            />
                        </div>
                    )}

                    {/* Top Rated */}
                    {movieCategories?.top_rated && (
                        <div>
                            <MovieGrid 
                                movies={movieCategories.top_rated} 
                                title={`Top Rated ${selectedGenre.name} Movies`}
                            />
                        </div>
                    )}

                    {/* Latest Releases */}
                    {movieCategories?.latest && (
                        <div>
                            <MovieGrid 
                                movies={movieCategories.latest} 
                                title={`Latest ${selectedGenre.name} Releases`}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 