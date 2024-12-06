import { Movie } from '../types/movie';
import MovieCard from './MovieCard';

interface MovieGridProps {
    title: string;
    movies: Movie[];
}

export default function MovieGrid({ title, movies }: MovieGridProps) {
    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    );
}