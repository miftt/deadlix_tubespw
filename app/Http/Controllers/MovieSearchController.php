<?php

namespace App\Http\Controllers;

use App\Services\TMDBService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MovieSearchController extends Controller
{
    private $tmdbService;

    public function __construct(TMDBService $tmdbService)
    {
        $this->tmdbService = $tmdbService;
    }

    public function search(Request $request)
    {
        $search = $request->input('query');
        
        if (empty($search)) {
            return response()->json([
                'results' => []
            ]);
        }

        $results = $this->tmdbService->searchMovies($search);

        Log::info('Search results controller', [
            'results' => $results
        ]);

        return response()->json([
            'results' => $results['results']
        ]);
    }
}