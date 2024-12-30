<?php

namespace App\Http\Controllers;

use App\Models\Watchlist;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\TMDBService;

class WatchlistController extends Controller
{
    protected $tmdbService;

    public function __construct(TMDBService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function index()
    {
        $watchlistItems = Auth::user()->watchlist()->pluck('movie_id')->toArray();
        $movies = [];

        foreach ($watchlistItems as $movieId) {
            $movieDetails = $this->tmdbService->getMovieDetails($movieId);
            if ($movieDetails) {
                $movies[] = $movieDetails;
            }
        }

        return Inertia::render('Watchlist', [
            'movies' => $movies
        ]);
    }

    public function toggle(Request $request)
    {
        $movieId = $request->movie_id;
        $user = Auth::user();

        $existing = $user->watchlist()->where('movie_id', $movieId)->first();

        if ($existing) {
            $existing->delete();
            return response()->json(['status' => 'removed']);
        }

        $user->watchlist()->create([
            'movie_id' => $movieId
        ]);

        return response()->json(['status' => 'added']);
    }

    public function check(Request $request)
    {
        $movieId = $request->movie_id;
        $exists = Auth::user()->watchlist()->where('movie_id', $movieId)->exists();

        return response()->json(['inWatchlist' => $exists]);
    }
} 