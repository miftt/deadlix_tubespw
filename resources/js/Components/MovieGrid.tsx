import React from 'react';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
}

interface MovieGridProps {
    movies: Movie[];
    title: string;
}

export default function MovieGrid({ movies, title }: MovieGridProps) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {movies.map((movie) => (
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
        </div>
    );
} 