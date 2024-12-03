<?php

namespace App\Http\Controllers;

use App\Services\TmdbService;
use Inertia\Inertia;

class WatchMovieController extends Controller
{
    protected $tmdbService;

    public function __construct(TmdbService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function watch($id)
    {
        $movieDetails = $this->tmdbService->getMovieDetails($id);

        if (!$movieDetails) {
            abort(404);
        }

        return Inertia::render('Movie/Watch', [
            'movie' => $movieDetails
        ]);
    }
}
