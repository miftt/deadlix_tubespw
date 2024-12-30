import { useState, useEffect } from 'react';
import axios from 'axios';

interface Props {
    movieId: number;
}

export default function WatchlistButton({ movieId }: Props) {
    const [isInWatchlist, setIsInWatchlist] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        checkWatchlistStatus();
    }, [movieId]);

    const checkWatchlistStatus = async () => {
        try {
            const response = await axios.get(`/watchlist/check/${movieId}`);
            setIsInWatchlist(response.data.inWatchlist);
        } catch (error) {
            console.error('Error checking watchlist status:', error);
        }
    };

    const toggleWatchlist = async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            const response = await axios.post('/watchlist/toggle', {
                movie_id: movieId
            });
            setIsInWatchlist(response.data.status === 'added');
        } catch (error) {
            console.error('Error toggling watchlist:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={toggleWatchlist}
            disabled={isLoading}
            className={`p-2 rounded-full transition-colors ${
                isInWatchlist 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill={isInWatchlist ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                />
            </svg>
        </button>
    );
} 