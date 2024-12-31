<?php

namespace App\Http\Controllers;

use App\Services\TMDBService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WatchlistController extends Controller
{
    protected $tmdbService;

    public function __construct(TMDBService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function index()
    {
        $user = Auth::user();
        $watchlist = $user->watchlists()->pluck('movie_id')->toArray();
        $movies = [];
        foreach ($watchlist as $movieId) {
            $movieDetails = $this->tmdbService->getMovieDetails($movieId);
            if ($movieDetails) {
                $movies[] = $movieDetails;
            }
        }

        return Inertia::render('Watchlist/Watchlist', [
            'watchlist' => $movies
        ]);
    }

    public function show()
    {
        $user = Auth::user();
        $watchlist = $user->watchlists()->pluck('movie_id')->toArray();
        $movies = [];
        foreach ($watchlist as $movieId) {
            $movieDetails = $this->tmdbService->getMovieDetails($movieId);
            if ($movieDetails) {
                $movies[] = $movieDetails;
            }
        }
        return response()->json(['watchlist' => $movies]);
    }

    public function handleWatchlist(Request $request)
    {

        $movieId = $request->movie_id;
        $user = Auth::user();

        $existing = $user->watchlists()->where('movie_id', $movieId)->first();
        if ($existing) {
            $existing->delete();
            return response()->json(['status' => 'removed']);
        }
        $user->watchlists()->create([
            'movie_id' => $movieId
        ]);
        return response()->json(['status' => 'added']);
    }
}
