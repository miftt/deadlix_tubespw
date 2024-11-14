<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class SearchController extends Controller
{
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.themoviedb.org/3/',
            'timeout'  => 5.0,
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');
        $searchResults = $this->searchMovies($query);

        return Inertia::render('Home', [
            'searchResults' => $searchResults,
        ]);
    }

    private function searchMovies($query)
    {
        try {
            $response = $this->client->request('GET', 'search/movie', [
                'query' => [
                    'api_key' => config('services.tmdb.api_key'),
                    'query' => $query,
                ]
            ]);

            $data = json_decode($response->getBody(), true);
            return collect($data['results'] ?? [])->map(function ($movie) {
                return [
                    'id' => $movie['id'],
                    'title' => $movie['title'],
                    'imageUrl' => $movie['poster_path']
                        ? 'https://image.tmdb.org/t/p/w500' . $movie['poster_path']
                        : null,
                ];
            })->take(10)->all();
        } catch (RequestException $e) {
            // Log the error or handle it as needed
            return [];
        }
    }
}
