import { Link } from "@inertiajs/react";
import { Star, Play } from "lucide-react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
}

interface RecommendationsSectionProps {
    recommendations: Movie[];
}

export default function RecommendationsSection({
    recommendations,
}: RecommendationsSectionProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
                Recommendations
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {recommendations.map((movie) => (
                    <Link
                        key={movie.id}
                        href={`/movie/${movie.id}`}
                        className="bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl group"
                    >
                        <div className="relative overflow-hidden">
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                                        : "/images/no-poster.png"
                                }
                                alt={movie.title}
                                className="w-full aspect-[2/3] object-cover transition duration-300 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="absolute bottom-0 p-4 w-full">
                                    <h3 className="text-white text-lg font-semibold mb-2">
                                        {movie.title}
                                    </h3>
                                    <div className="flex items-center space-x-2">
                                        <Star
                                            className="text-yellow-400"
                                            size={16}
                                        />
                                        <span className="text-white">
                                            {movie.vote_average.toFixed(1)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
