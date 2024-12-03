interface MovieDetails {
    id: number;
    status: string;
    adult: boolean;
    original_language: string;
    revenue: number;
    budget: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    release_date: string;
    tagline: string;
    genres: {
        id: number;
        name: string;
    }[];
    runtime: number;
}

interface VideoResponse {
    results: VideoType[];
}

interface VideoType {   
    key: string;
    name: string;
    site: string;
    type: string;
}

export type { MovieDetails, VideoType, VideoResponse };