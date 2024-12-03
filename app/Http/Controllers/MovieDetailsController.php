<?php

namespace App\Http\Controllers;

use App\Services\TMDBService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MovieDetailsController extends Controller
{
    private $tmdbService;

    public function __construct(TMDBService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function index($id)
    {
        $movieDetails = $this->tmdbService->getMovieDetails($id);
        $trailerVideo = $this->tmdbService->getMovieTrailers($id);

        return Inertia::render('MovieDetails/Movie', [
            'movie' => $movieDetails,
            'trailer' => $trailerVideo
        ]);
    }
}
