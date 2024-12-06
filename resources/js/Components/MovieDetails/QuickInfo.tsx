import { Star, Clock, Calendar, Globe } from 'lucide-react'
import { MovieDetails } from '@/types/moviedetails'

interface QuickInfoProps {
    movie: MovieDetails
}

export default function QuickInfo({ movie }: QuickInfoProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <InfoItem
                icon={<Star />}
                label="Rating"
                value={`${movie.vote_average.toFixed(1)}/10`}
            />
            <InfoItem
                icon={<Clock />}
                label="Runtime"
                value={`${movie.runtime} min`}
            />
            <InfoItem
                icon={<Calendar />}
                label="Release"
                value={new Date(movie.release_date).getFullYear().toString()}
            />
            <InfoItem
                icon={<Globe />}
                label="Language"
                value={movie.original_language.toUpperCase()}
            />
        </div>
    )
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="text-red-500">{icon}</div>
            <div>
                <p className="text-sm text-gray-400">{label}</p>
                <p className="text-white font-medium">{value}</p>
            </div>
        </div>
    )
} 