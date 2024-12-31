"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { MovieDetails as MovieDetailsType } from "@/types/moviedetails";
import { VideoResponse } from "@/types/moviedetails";
import { Head, router, usePage } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import LoadingMovie from "@/Components/LoadingMovie";
import MovieHero from "@/Components/MovieDetails/MovieHero";
import CastSection from "@/Components/MovieDetails/CastSection";
import RecommendationsSection from "@/Components/MovieDetails/RecommendationsSection";
import axios from "axios";

interface Props {
    movie: MovieDetailsType;
    trailer: VideoResponse;
    cast: Array<{
        id: number;
        name: string;
        character: string;
        profile_path: string | null;
    }>;
    recommendations: Array<{
        id: number;
        title: string;
        poster_path: string;
        vote_average: number;
    }>;
}

export default function Movie({
    movie,
    trailer,
    cast,
    recommendations,
}: Props) {
    const [showTrailer, setShowTrailer] = useState(false);
    const [watchlist, setWatchlist] = useState<Array<MovieDetailsType>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { auth } = usePage().props;

    useEffect(() => {
        if (movie && trailer && cast) {
            setIsLoading(false);
        }
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get('/api/watchlist');
                setWatchlist(response.data.watchlist);
                console.log('watchlist', response.data);
            } catch (error) {
                console.error('Error fetching watchlist:', error);
            }
        };
        if (auth.user) {
            fetchWatchlist();
        }
    }, [movie, trailer, cast]);

    if (!movie) return null;
    if (isLoading) return <LoadingMovie />;

    const trailerVideo = trailer.results.find(
        (video) =>
            video.site === "YouTube" &&
            (video.type === "Trailer" || video.type === "Teaser")
    );

    const handleAddToWatchlist = async (movie: MovieDetailsType) => {
        try{
            if (auth.user) {
                const response = await axios.post(`/watchlist/handle`, { movie_id: movie.id });
                console.log('response', response);
                setWatchlist([...watchlist, movie]);
            } else {
                router.visit('/login');
            }
        } catch (error) {
            console.error('Error adding to watchlist:', error);
        }
    };

    const handleRemoveFromWatchlist = async (movie: MovieDetailsType) => {
        try{
            if (auth.user) {
                const response = await axios.post(`/watchlist/handle`, { movie_id: movie.id });
                console.log('response', response);
                setWatchlist(watchlist.filter((m) => m.id !== movie.id));
            } else {
                router.visit('/login');
            }
        } catch (error) {
            console.error('Error removing from watchlist:', error);
        }
    };

    return (
        <>
            <Head title={movie.title} />
            <div className="min-h-screen bg-gray-900">
                <Navbar user={auth.user} />

                <MovieHero
                    movie={movie}
                    onWatchTrailer={() => setShowTrailer(true)}
                    hasTrailer={!!trailerVideo}
                    hasWatchlist={watchlist.some(m => m.id === movie.id)}
                    onAddToWatchlist={handleAddToWatchlist}
                    onRemoveFromWatchlist={handleRemoveFromWatchlist}
                />

                <div className="container mx-auto px-4 py-12">
                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Overview
                        </h2>
                        <p className="text-gray-300 leading-relaxed max-w-3xl">
                            {movie.overview}
                        </p>
                    </section>

                    {cast.length > 0 && <CastSection cast={cast} />}
                    {recommendations.length > 0 && (
                        <RecommendationsSection
                            recommendations={recommendations}
                        />
                    )}
                </div>

                {showTrailer && trailerVideo && (
                    <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
                        <div className="relative w-full max-w-5xl">
                            <button
                                onClick={() => setShowTrailer(false)}
                                className="absolute -top-12 right-0 text-white hover:text-red-500 flex items-center gap-2"
                            >
                                <span>Close</span>
                                <X size={24} />
                            </button>
                            <div className="relative pt-[56.25%]">
                                <iframe
                                    className="absolute inset-0 w-full h-full rounded-lg"
                                    src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1`}
                                    title={trailerVideo.name}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </div>
                )}                
            </div>
        </>
    );
}
