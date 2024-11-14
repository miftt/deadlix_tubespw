import React from 'react';

interface Movie {
    id: number;
    title: string;
    imageUrl: string;
}

interface MovieRowProps {
    title: string;
    movies: Movie[];
}

export default function MovieRow({ title, movies }: MovieRowProps) {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{title}</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
                {movies.map((movie) => (
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
    );
} 