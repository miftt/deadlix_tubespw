<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TMDBService
{
    private $baseUrl;
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.tmdb.api_key');
        $this->baseUrl = config('services.tmdb.base_url');
    }

    public function getFeaturedContent()
    {
        try {
            $response = Http::withToken($this->apiKey)
                ->get("{$this->baseUrl}/trending/movie/week");

            Log::info('Fetching featured content', [
                'url' => "{$this->baseUrl}/trending/movie/week",
                'status' => $response->status()
            ]);

            if ($response->successful()) {
                return $response->json()['results'][0] ?? null;
            }

            Log::warning('Failed to fetch featured content', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('Exception in getFeaturedContent', [
                'message' => $e->getMessage()
            ]);
            return null;
        }
    }

    public function getCategories()
    {
        $categories = [
            'popular' => $this->fetchMovies('/movie/popular'),
            'topRated' => $this->fetchMovies('/movie/top_rated'),
            'upcoming' => $this->fetchMovies('/movie/upcoming'),
            'trending' => $this->fetchMovies('/trending/movie/week')
        ];

        Log::info('Categories retrieved', [
            'categories_count' => array_map('count', $categories)
        ]);

        return $categories;
    }

    public function getMovieDetails($id)
    {
        $response = Http::withToken($this->apiKey)
            ->get("{$this->baseUrl}/movie/{$id}");

        if ($response->successful()) {
            Log::info('Movie details retrieved', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return $response->json();
        } else {
            Log::warning('Failed to fetch movie details', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return null;
        }
    }

    public function getMovieTrailers($id)
    {
        $response = Http::withToken($this->apiKey)
            ->get("{$this->baseUrl}/movie/{$id}/videos");

        if ($response->successful()) {
            Log::info('Movie trailers retrieved', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return $response->json();
        } else {
            Log::warning('Failed to fetch movie trailers', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return null;
        }
    }

    public function getMovieCast($id)
    {
        $response = Http::withToken($this->apiKey)
            ->get("{$this->baseUrl}/movie/{$id}/credits");

        if ($response->successful()) {
            Log::info('Movie cast retrieved', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return $response->json();
        } else {
            Log::warning('Failed to fetch movie cast', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return null;
        }
    }

    public function getMovieRecommendations($id)
    {
        $response = Http::withToken($this->apiKey)
            ->get("{$this->baseUrl}/movie/{$id}/recommendations");

        if ($response->successful()) {
            Log::info('Movie recommendations retrieved', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return $response->json()['results'] ?? [];
        } else {
            Log::warning('Failed to fetch movie recommendations', [
                'status' => $response->status(),
                'body' => $response->body()
            ]);
            return [];
        }
    }

    private function fetchMovies($endpoint)
    {
        try {
            $response = Http::withToken($this->apiKey)
                ->get("{$this->baseUrl}{$endpoint}");

            Log::info('Fetching movies', [
                'endpoint' => $endpoint,
                'status' => $response->status()
            ]);

            if ($response->successful()) {
                return $response->json()['results'] ?? [];
            }

            Log::warning('Failed to fetch movies', [
                'endpoint' => $endpoint,
                'status' => $response->status(),
                'body' => $response->body()
            ]);

            return [];
        } catch (\Exception $e) {
            Log::error('Exception in fetchMovies', [
                'endpoint' => $endpoint,
                'message' => $e->getMessage()
            ]);
            return [];
        }
    }

    public function searchMovies($query)
    {
        $response = Http::withToken($this->apiKey)
                ->get("{$this->baseUrl}/search/movie", [
                    'query' => $query,
                    'include_adult' => false,
                ]);

            Log::info('Fetching search movies', [
                'endpoint' => "{$this->baseUrl}/search/movie",
                'status' => $response->status()
            ]);

        return $response->json();
    }
}
