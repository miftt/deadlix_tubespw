import { Check, Film, Play, Plus } from 'lucide-react'
import { Link, router } from '@inertiajs/react'
import { MovieDetails } from '@/types/moviedetails'
import QuickInfo from '@/Components/MovieDetails/QuickInfo'

interface MovieHeroProps {
    movie: MovieDetails
    onWatchTrailer: () => void
    hasTrailer: boolean
    hasWatchlist: boolean
    onAddToWatchlist: (movie: MovieDetails) => void
    onRemoveFromWatchlist: (movie: MovieDetails) => void
    onWatchBTS: () => void
    hasBTS: boolean
    onPlayMovie: () => void
    subscription?: {
        product_id: number
        status: string
    }
}

export default function MovieHero({ movie, onWatchTrailer, hasTrailer, hasWatchlist, onAddToWatchlist, onRemoveFromWatchlist, onWatchBTS, hasBTS, onPlayMovie, subscription }: MovieHeroProps) {
    const redirectToSubscription = () => {
        router.visit('/premium');
    }
    
    return (
        <div className="relative min-h-[85vh] mt-16">
            <div className="absolute inset-0">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-4 py-8 md:py-12">
                <div className="container mx-auto flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-8">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-48 md:w-64 rounded-lg shadow-2xl"
                    />
                    <div className="flex-1 text-white text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-3">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="text-lg md:text-xl text-gray-300 italic mb-3 md:mb-4">{movie.tagline}</p>
                        )}

                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4 md:mb-6">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="px-3 py-1 bg-red-600/90 rounded-full text-sm font-medium"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <QuickInfo movie={movie} />

                        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start mt-6">
                            {hasTrailer && (
                                <button
                                    onClick={onWatchTrailer}
                                    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 md:px-6 py-3 rounded-lg transition w-full sm:w-auto"
                                >
                                    <Play className="w-5 h-5" />
                                    <span className="font-medium">Watch Trailer</span>
                                </button>
                            )}
                            {hasBTS && (
                                <button
                                    onClick={!subscription?.product_id || subscription?.status !== 'active' ? redirectToSubscription : onWatchBTS}
                                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 md:px-6 py-3 rounded-lg transition w-full sm:w-auto"
                                >
                                    <Film className="w-5 h-5" />
                                    <span className="font-medium">Behind the Scenes</span>
                                </button>
                            )}
                            <Link
                                href={`/watch/${movie.id}`}
                                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 md:px-6 py-3 rounded-lg transition w-full sm:w-auto"
                            >
                                <Play className="w-5 h-5" />
                                <span className="font-medium">Play Movie</span>
                            </Link>
                            {hasWatchlist ? (
                                <button
                                    onClick={() => onRemoveFromWatchlist(movie)}
                                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 px-4 md:px-6 py-3 rounded-lg transition w-full sm:w-auto"
                                >
                                    <Check className="w-5 h-5" />
                                    <span className="font-medium">Remove from Watchlist</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => onAddToWatchlist(movie)}
                                    className="flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 md:px-6 py-3 rounded-lg transition w-full sm:w-auto"
                                >
                                    <Plus className="w-5 h-5" />
                                    <span className="font-medium">Add to Watchlist</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}