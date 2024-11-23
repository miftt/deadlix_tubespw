<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HomeController extends Controller
{
    private $baseUrl;
    private $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.tmdb.api_key');
        $this->baseUrl = config('services.tmdb.base_url');
    }

    public function index()
    {
        try {
            $featuredContent = $this->getFeaturedContent();
            $categories = $this->getCategories();

            // Log successful data retrieval  
            Log::info('Home page data retrieved successfully', [
                'featured_content' => $featuredContent ? $featuredContent['title'] : 'No content',
                'categories_count' => [
                    'popular' => count($categories['popular']),
                    'top_rated' => count($categories['topRated']),
                    'upcoming' => count($categories['upcoming']),
                    'trending' => count($categories['trending'])
                ]
            ]);

            return Inertia::render('Welcome', [
                'featuredContent' => $featuredContent,
                'categories' => $categories
            ]);
        } catch (\Exception $e) {
            // Log any unexpected errors  
            Log::error('Error retrieving home page data', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            // Optionally, return an error response or fallback data  
            return Inertia::render('Home', [
                'error' => 'Failed to load content'
            ]);
        }
    }

    private function getFeaturedContent()
    {
        try {
            $response = Http::withToken($this->apiKey)
                ->get("{$this->baseUrl}/trending/movie/week");

            // Log API request details  
            Log::info('Fetching featured content', [
                'url' => "{$this->baseUrl}/trending/movie/week",
                'status' => $response->status()
            ]);

            // Check for successful response  
            if ($response->successful()) {
                return $response->json()['results'][0] ?? null;
            }

            // Log API error  
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

    private function getCategories()
    {
        $categories = [
            'popular' => $this->fetchMovies('/movie/popular'),
            'topRated' => $this->fetchMovies('/movie/top_rated'),
            'upcoming' => $this->fetchMovies('/movie/upcoming'),
            'trending' => $this->fetchMovies('/trending/movie/week')
        ];

        // Log categories retrieval  
        Log::info('Categories retrieved', [
            'categories_count' => array_map('count', $categories)
        ]);

        return $categories;
    }

    private function fetchMovies($endpoint)
    {
        try {
            $response = Http::withToken($this->apiKey)
                ->get("{$this->baseUrl}{$endpoint}");

            // Log API request details  
            Log::info('Fetching movies', [
                'endpoint' => $endpoint,
                'status' => $response->status()
            ]);

            // Check for successful response  
            if ($response->successful()) {
                return $response->json()['results'] ?? [];
            }

            // Log API error  
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
}
