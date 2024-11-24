import { Play, Info } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface HeroProps {
    id: number;
    title: string;
    overview: string;
    backdropPath: string;
}

export default function Hero({ id, title, overview, backdropPath }: HeroProps) {
    return (
        <div className="relative h-[80vh] w-full">
            <div className="absolute inset-0">
                <img
                    src={`https://image.tmdb.org/t/p/original${backdropPath}`}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            </div>

            <div className="relative h-full container mx-auto px-4 flex items-center">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold text-white mb-4">{title}</h1>
                    <p className="text-lg text-gray-200 mb-8">{overview}</p>
                    <div className="flex space-x-4">
                        <Link href={`/movie/${id}`} className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
                            <Play size={20} />
                            <span>Watch Now</span>
                        </Link>
                        <Link href={`/movie/${id}`} className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition">
                            <Info size={20} />
                            <span>More Info</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}