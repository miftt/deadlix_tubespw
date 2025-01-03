import { Star, Trash2 } from 'lucide-react';
import { Movie } from '../types/movie';
import { Link } from "@inertiajs/react"

interface MovieCardProps {
    movie: Movie;
    type?: 'watchlist';
    onRemove?: () => void;

}

export default function MovieCard({ movie, type, onRemove }: MovieCardProps) {
    return (
        <div className="relative group/item">
            <Link href={`/movie/${movie.id}`}>
                <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-full h-[400px] object-cover transform group-hover/item:scale-105 transition duration-300"
                    />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <div className="absolute bottom-0 p-4 w-full">
                            <h3 className="text-white text-lg font-semibold mb-2">{movie.title}</h3>
                            <div className="flex items-center space-x-2">
                                <Star className="text-yellow-400" size={16} />
                                <span className="text-white">{movie.vote_average.toFixed(1)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            {type === 'watchlist' && (
                <button
                    onClick={onRemove}
                    className="absolute top-2 right-2 p-2 bg-red-600 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-red-700"
                >
                    <Trash2 className="text-white" size={16} />
                </button>
            )}
        </div>
    );
}