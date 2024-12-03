interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface CastSectionProps {
    cast: CastMember[];
}

export default function CastSection({ cast }: CastSectionProps) {
    return (
        <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Top Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {cast.slice(0, 6).map((person) => (
                    <div
                        key={person.id}
                        className="relative overflow-hidden rounded-lg group"
                    >
                        <img
                            src={
                                person.profile_path
                                    ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
                                    : "/images/unknown-person.png"
                            }
                            alt={person.name}
                            className="w-full h-[400px] object-cover transform group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="absolute bottom-0 p-4 w-full">
                                <h3 className="text-white text-lg font-semibold mb-2">
                                    {person.name}
                                </h3>
                                <p className="text-gray-300">
                                    {person.character}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
