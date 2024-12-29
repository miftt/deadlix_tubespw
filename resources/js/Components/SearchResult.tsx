import React from 'react';
import { Movie } from '../types/movie';
import { Link } from '@inertiajs/react';

interface SearchResultsProps {
  results: Movie[];
  isLoading: boolean;
}

export default function SearchResults({ results, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="bg-[#141414] shadow-lg">
        <div className="animate-pulse p-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-800 mb-2 last:mb-0"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#141414] shadow-lg max-h-[70vh] overflow-y-auto">
      {results.map((movie) => (
        <Link
          key={movie.id}
          href={`/movie/${movie.id}`}
          className="flex items-center space-x-3 px-4 py-2 hover:bg-[#1f1f1f] transition-colors duration-200"
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
              alt={movie.title}
              className="w-10 h-14 object-cover"
            />
          ) : (
            <div className="w-10 h-14 bg-[#1f1f1f] flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
          <div>
            <div className="text-white font-medium">{movie.title}</div>
            <div className="text-sm text-gray-400">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}