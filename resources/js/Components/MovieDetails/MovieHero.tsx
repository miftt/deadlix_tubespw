import { Play } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { MovieDetails } from '@/types/moviedetails'
import QuickInfo from '@/Components/MovieDetails/QuickInfo'

interface MovieHeroProps {
    movie: MovieDetails
    onWatchTrailer: () => void
    hasTrailer: boolean
}

export default function MovieHero({ movie, onWatchTrailer, hasTrailer }: MovieHeroProps) {
    return (
        <div className="relative h-[85vh]">
            <div className="absolute inset-0">
                <img
                    src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 px-4 py-12">
                <div className="container mx-auto flex flex-col md:flex-row items-end gap-8">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="hidden md:block w-64 rounded-lg shadow-2xl"
                    />
                    <div className="flex-1 text-white">
                        <h1 className="text-5xl font-bold mb-3">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="text-xl text-gray-300 italic mb-4">{movie.tagline}</p>
                        )}

                        <div className="flex flex-wrap gap-2 mb-6">
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

                        <div className="flex gap-4">
                            {hasTrailer && (
                                <button
                                    onClick={onWatchTrailer}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg transition"
                                >
                                    <Play className="w-5 h-5" />
                                    <span className="font-medium">Watch Trailer</span>
                                </button>
                            )}
                            <Link
                                href={`/watch/${movie.id}`}
                                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition"
                            >
                                <Play className="w-5 h-5" />
                                <span className="font-medium">Play Movie</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}