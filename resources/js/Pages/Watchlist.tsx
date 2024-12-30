import { Movie } from '@/types/movie';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import MovieGrid from '@/Components/MovieGrid';

interface Props {
    movies: Movie[];
}

export default function Watchlist({ movies }: Props) {
    const { auth } = usePage().props;

    return (
        <>
            <Head>
                <title>My Watchlist - Deadflix</title>
            </Head>

            <div className="min-h-screen bg-gray-900 pt-16">
                <Navbar user={auth.user} />

                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-white text-3xl font-bold mb-6">My Watchlist</h1>
                    {movies.length > 0 ? (
                        <MovieGrid movies={movies} title="" />
                    ) : (
                        <div className="text-white text-center py-12">
                            Your watchlist is empty. Add some movies to watch later!
                        </div>
                    )}
                </div>
            </div>
        </>
    );
} 