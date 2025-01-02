<?php

namespace App\Http\Controllers;

use App\Services\TMDBService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
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

        // Cek apakah film sudah ada di watchlist
        $existing = $user->watchlists()->where('movie_id', $movieId)->first();
        
        // Jika film ada, maka hapus film tersebut dari watchlist
        if ($existing) {
            $existing->delete();
            return response()->json(['status' => 'removed']);
        }

        // Cek apakah pengguna sudah memiliki lebih dari 5 film di watchlist, hanya untuk menambah film
        $watchlistCount = $user->watchlists()->count();
        $subscription = $user->subscription;

        // Jika jumlah film di watchlist lebih dari atau sama dengan 5 dan subscription tidak aktif
        if ($watchlistCount >= 5 && !$subscription->isActive()) {
            return response()->json(['status' => 'rejected', 'message' => 'Your watchlist is full. You cannot add more than 5 movies. Please upgrade to premium to add more movies.']);
        }

        // Tambahkan film baru ke dalam watchlist
        $user->watchlists()->create([
            'movie_id' => $movieId
        ]);

        return response()->json(['status' => 'added']);
    }


}