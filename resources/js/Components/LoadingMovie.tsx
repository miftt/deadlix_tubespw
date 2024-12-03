export default function LoadingMovie() {
    return (
        <div className="min-h-screen bg-gray-900 animate-pulse">
            {/* Hero Section Skeleton */}
            <div className="relative h-[85vh]">
                <div className="absolute inset-0 bg-gray-800" />

                <div className="absolute bottom-0 left-0 right-0 px-4 py-12">
                    <div className="container mx-auto flex flex-col md:flex-row items-end gap-8">
                        {/* Poster Skeleton */}
                        <div className="hidden md:block w-64 h-96 bg-gray-700 rounded-lg" />

                        <div className="flex-1">
                            {/* Title Skeleton */}
                            <div className="h-12 bg-gray-700 rounded-lg w-3/4 mb-4" />

                            {/* Tagline Skeleton */}
                            <div className="h-6 bg-gray-700 rounded-lg w-1/2 mb-6" />

                            {/* Genre Tags Skeleton */}
                            <div className="flex gap-2 mb-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-8 w-20 bg-gray-700 rounded-full" />
                                ))}
                            </div>

                            {/* Quick Info Skeleton */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-16 bg-gray-700 rounded-lg" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Sections Skeleton */}
            <div className="container mx-auto px-4 py-12">
                {/* Overview Skeleton */}
                <div className="mb-12">
                    <div className="h-8 bg-gray-700 rounded-lg w-40 mb-4" />
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-700 rounded w-full" />
                        <div className="h-4 bg-gray-700 rounded w-5/6" />
                        <div className="h-4 bg-gray-700 rounded w-4/6" />
                    </div>
                </div>

                {/* Cast Section Skeleton */}
                <div className="mb-12">
                    <div className="h-8 bg-gray-700 rounded-lg w-40 mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                                <div className="aspect-[2/3] bg-gray-700" />
                                <div className="p-3">
                                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recommendations Section Skeleton */}
                <div className="mb-12">
                    <div className="h-8 bg-gray-700 rounded-lg w-40 mb-6" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                                <div className="aspect-[2/3] bg-gray-700" />
                                <div className="p-3">
                                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
                                    <div className="h-3 bg-gray-700 rounded w-1/2" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 