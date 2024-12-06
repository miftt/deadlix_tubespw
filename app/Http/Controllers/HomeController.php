<?php

namespace App\Http\Controllers;

use App\Services\TmdbService;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class HomeController extends Controller
{
    private $tmdbService;

    public function __construct(TMDBService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function index()
    {
        try {
            $featuredContent = $this->tmdbService->getFeaturedContent();
            $categories = $this->tmdbService->getCategories();

            Log::info('Home page data retrieved successfully', [
                'featured_content' => $featuredContent ? $featuredContent['title'] : 'No content',
                'categories_count' => [
                    'popular' => count($categories['popular']),
                    'top_rated' => count($categories['topRated']),
                    'upcoming' => count($categories['upcoming']),
                    'trending' => count($categories['trending']),
                ],
            ]);

            return Inertia::render('Home', [
                'featuredContent' => $featuredContent,
                'categories' => $categories
            ]);
        } catch (\Exception $e) {
            Log::error('Error retrieving home page data', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return Inertia::render('Home', [
                'error' => 'Failed to load content'
            ]);
        }
    }
}
