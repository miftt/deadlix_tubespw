import React from 'react';
import { Play, Info } from 'lucide-react';
import SearchBar from './SearchBar';

interface HeroProps {
    featuredContent: {
        title: string;
        description: string;
        imageUrl: string;
    } | null;
    searchBarProps: {
        query: string;
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
        onSubmit: (e: React.FormEvent) => void;
        isSearchBarFloating: boolean;
    };
}

export default function HeroSection({ featuredContent, searchBarProps }: HeroProps) {
    if (featuredContent && featuredContent.imageUrl) {
        return (
            <section
                className="relative h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredContent.imageUrl})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-60" />
                <div className="absolute bottom-1/4 left-16 max-w-xl">
                    <h1 className="text-5xl font-bold mb-4">{featuredContent.title}</h1>
                    <p className="text-lg mb-6">{featuredContent.description}</p>
                    <div className="flex space-x-4">
                        <button className="flex items-center bg-white text-black px-6 py-2 rounded">
                            <Play className="mr-2" />
                            Play
                        </button>
                        <button className="flex items-center bg-gray-500 bg-opacity-70 px-6 py-2 rounded">
                            <Info className="mr-2" />
                            More Info
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-screen bg-gray-900 flex items-center justify-center">
            <div className="absolute inset-0">
                <img src="/images/hero.png" alt="Hero background" className="w-full h-full object-cover opacity-50" />
            </div>
            <div className="relative z-10 text-center">
                <h1 className="text-5xl font-bold text-white mb-4">Welcome to DEADLIX</h1>
                <p className="text-xl text-gray-300 mb-8">Discover your next favorite movie or TV show</p>
                <SearchBar
                    {...searchBarProps}
                    className={`transition-opacity duration-300 ${searchBarProps.isSearchBarFloating ? 'opacity-0' : 'opacity-100'}`}
                />
            </div>
        </section>
    );
} 