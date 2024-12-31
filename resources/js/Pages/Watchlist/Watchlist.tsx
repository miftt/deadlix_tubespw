import { Head, usePage } from '@inertiajs/react';
import MovieCard from '@/Components/MovieCard';
import EmptyState from '@/Components/EmptyState'
import { Movie } from '@/types/movie';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';
import axios from 'axios';

interface Props {
    watchlist: Movie[];
}

export default function Watchlist({ watchlist }: Props) {
    const auth = usePage().props.auth;
    const [watchlists, setWatchlists] = useState(watchlist);
    const handleRemove = async (id: number) => {
        try {
            const response = await axios.post(`/watchlist/handle`, { movie_id: id });
            console.log('response', response);
            setWatchlists(watchlists.filter((m) => m.id !== id));
        } catch (error) {
            console.error('Error removing movie from watchlist:', error);
        }
    };
    return (
        <>
            <Head title="My Watchlist" />
            <Navbar user={auth.user} />

            <div className="min-h-screen bg-[#121212] mt-16">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-white text-3xl font-bold mb-8">My Watchlist</h1>

                    {watchlists.length === 0 ? (
                        <EmptyState
                            title="Your watchlist is empty"
                            description="Movies and TV shows that you add to your watchlist will appear here"
                        />
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {watchlists.map((watchlist) => (
                                <MovieCard key={watchlist.id} movie={watchlist} type="watchlist" onRemove={() => handleRemove(watchlist.id)} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}