import React, { useState } from 'react';
import { Link } from '@inertiajs/react';

interface Genre {
    id: number;
    name: string;
}

interface Props {
    genres: Genre[];
    selectedGenre: Genre;
}

export default function GenreSelector({ genres, selectedGenre }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-1 bg-transparent text-white border border-white/30 rounded-sm hover:bg-white/10 transition"
            >
                <span>{selectedGenre?.name || 'Select Genre'}</span>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-56 bg-black/95 border border-white/20 rounded-sm shadow-lg">
                    <div className="py-1 max-h-96 overflow-y-auto">
                        {genres.map((genre) => (
                            <Link
                                key={genre.id}
                                href={`/movies/genre/${genre.id}`}
                                className={`block px-4 py-2 text-sm ${
                                    selectedGenre?.id === genre.id
                                        ? 'bg-white/10 text-white'
                                        : 'text-gray-300 hover:bg-white/10'
                                }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
} 