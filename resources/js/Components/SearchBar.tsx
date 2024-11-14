import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    query: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    isFloating?: boolean;
    className?: string;
}

export default function SearchBar({ query, onChange, onSubmit, isFloating, className }: SearchBarProps) {
    return (
        <form onSubmit={onSubmit} className={`relative max-w-xl mx-auto ${className}`}>
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Search movies or TV shows..."
                    className={`w-full ${isFloating ? 'bg-gray-900/90' : 'bg-black/70'} text-white px-6 ${isFloating ? 'py-2' : 'py-4'} rounded-lg 
                    border-2 border-gray-600 focus:border-red-600 pr-14
                    placeholder-gray-400 text-lg
                    transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600/50`}
                    value={query}
                    onChange={onChange}
                />
                <button
                    type="submit"
                    className="absolute right-3 p-2 hover:bg-red-600/20 rounded-full transition-colors duration-300"
                >
                    <Search className={`text-red-600 ${isFloating ? 'h-5 w-5' : 'h-6 w-6'}`} />
                </button>
            </div>
            {!isFloating && <p className="mt-2 text-sm text-gray-400">Press Enter to search</p>}
        </form>
    );
} 