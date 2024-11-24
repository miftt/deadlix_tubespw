import Hero from '@/Components/Hero';
import LoadingSpinner from '@/Components/LoadingSpinner';
import MovieGrid from '@/Components/MovieGrid';
import Navbar from '@/Components/Navbar';
import { Movie } from '@/types/movie';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

interface categoriesProps {
    categories: {
        popular: Movie[];
        topRated: Movie[];
        upcoming: Movie[];
        trending: Movie[];
    };
}

export default function Home({ categories }: categoriesProps) {
    const { auth } = usePage().props;
    const [isLoading, setIsLoading] = useState(true);
    const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
    const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                if (categories) {
                    setTrendingMovies(categories.trending);
                    setPopularMovies(categories.popular);
                    setTopRatedMovies(categories.topRated);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMovies();
    }, [trendingMovies, popularMovies, topRatedMovies]);


    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <Head>
                <title>Deadflix - Home</title>
                <meta name="description" content="Watch your favorite movies" />
            </Head>

            <div className="min-h-screen bg-gray-900 pt-16">
                <Navbar user={auth.user} />

                {/* Hero Section */}
                {trendingMovies && (
                    <Hero
                        id={trendingMovies[2].id}
                        title={trendingMovies[2].title}
                        overview={trendingMovies[2].overview}
                        backdropPath={trendingMovies[2].backdrop_path}
                    />
                )}

                <div className="container mx-auto px-4 -mt-32 relative z-10">
                    {trendingMovies.length > 0 && (
                        <MovieGrid title="Trending Now" movies={trendingMovies.slice(0, 10)} />
                    )}
                    {popularMovies.length > 0 && (
                        <MovieGrid title="Popular Movies" movies={popularMovies.slice(0, 10)} />
                    )}
                    {topRatedMovies.length > 0 && (
                        <MovieGrid title="Top Rated Movies" movies={topRatedMovies.slice(0, 10)} />
                    )}

                </div>
            </div>
        </>
    );
}
