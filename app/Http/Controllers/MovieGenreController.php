<?php

namespace App\Http\Controllers;

use App\Services\TMDBService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieGenreController extends Controller
{
    private $tmdbService;

    public function __construct(TMDBService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function index()
    {
        $genres = $this->tmdbService->getGenres();
        $defaultGenreId = $genres[0]['id'] ?? 28;
        $movieCategories = $this->tmdbService->getGenreMoviesByCategory($defaultGenreId);
        
        return Inertia::render('Movies/Genre', [
            'genres' => $genres,
            'featuredMovies' => $movieCategories['trending'],
            'selectedGenre' => $genres[0] ?? null,
            'movieCategories' => $movieCategories
        ]);
    }

    public function show($id)
    {
        $genres = $this->tmdbService->getGenres();
        $selectedGenre = collect($genres)->firstWhere('id', (int)$id);
        $movieCategories = $this->tmdbService->getGenreMoviesByCategory($id);

        return Inertia::render('Movies/Genre', [
            'genres' => $genres,
            'featuredMovies' => $movieCategories['trending'],
            'selectedGenre' => $selectedGenre,
            'movieCategories' => $movieCategories
        ]);
    }
}
