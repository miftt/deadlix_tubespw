import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { MovieDetails } from '@/types/moviedetails';
import LoadingSpinner from '@/Components/LoadingSpinner';
import { Head, Link } from '@inertiajs/react';

interface Props {
    movie: MovieDetails
}

export default function WatchMovie({ movie }: Props) {
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    if (error) return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center text-red-500">
                <p className="text-xl">{error}</p>
                <Link
                    href={`/movie/${movie.id}`}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Back to Movie Details
                </Link>
            </div>
        </div>
    );

    return (
        <>
            <Head title={movie.title} />
            <div className="min-h-screen bg-black">
                {/* Header */}
                <div className="fixed top-0 left-0 right-0 bg-gray-900 z-10">
                    <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                        <Link
                            href={`/movie/${movie.id}`}
                            className="flex items-center space-x-2 text-white hover:text-red-500"
                        >
                            <ArrowLeft size={20} />
                            <span>Back to details</span>
                        </Link>
                        {movie && (
                            <h1 className="text-white font-bold truncate max-w-md">
                                {movie.title}
                            </h1>
                        )}
                    </div>
                </div>

                {/* Video Player Container */}
                <div className="w-full h-screen pt-16">
                    {/* {isLoading ? (
                    <div className="h-full flex items-center justify-center">
                        <LoadingSpinner />
                    </div>
                ) : ( */}
                    <div className="relative w-full h-full">
                        <iframe
                            src={`https://moviesapi.club/movie/${movie.id}`}
                            className="absolute top-0 left-0 w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </div>
                    {/* )} */}
                </div>
            </div>
        </>
    );
} 