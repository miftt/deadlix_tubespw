<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;

class TMDBService
{
    protected $client;
    protected $bearerToken;
    protected $baseUrl;

    public function __construct()
    {
        $this->bearerToken = config('services.tmdb.api_key');
        $this->baseUrl = config('services.tmdb.base_url');
        $this->client = new Client([
            'base_uri' => $this->baseUrl,
            'timeout'  => 5.0,
            'headers' => [
                'Authorization' => 'Bearer ' . $this->bearerToken,
                'Accept' => 'application/json',
            ],
        ]);
    }

    /**
     * Mengambil konten unggulan (featured content).
     */
    public function getFeaturedContent()
    {
        try {
            $response = $this->client->request('GET', '/movie/popular', [
                'query' => [
                    'language' => 'id-ID',
                    'page' => 1,
                ]
            ]);

            $statusCode = $response->getStatusCode();
            if ($statusCode === 200) {
                $data = json_decode($response->getBody(), true);
                $movies = $data['results'] ?? [];
                $featured = $movies[0] ?? null;

                if ($featured) {
                    return [
                        'title' => $featured['title'],
                        'description' => $featured['overview'],
                        'imageUrl' => 'https://image.tmdb.org/t/p/original' . $featured['backdrop_path'],
                    ];
                }
            }
        } catch (RequestException $e) {
            Log::error('TMDB API Error: ' . $e->getMessage());
        }

        return null;
    }

    /**
     * Mengambil kategori film dan daftar film di setiap kategori.
     */
    public function getCategories()
    {
        $categories = [
            ['id' => 1, 'name' => 'Popular Movies', 'endpoint' => 'https://api.themoviedb.org/3/movie/popular'],
            ['id' => 2, 'name' => 'Top Rated', 'endpoint' => 'https://api.themoviedb.org/3/movie/top_rated'],
            ['id' => 3, 'name' => 'Now Playing', 'endpoint' => 'https://api.themoviedb.org/3/movie/now_playing'],
            ['id' => 4, 'name' => 'Upcoming', 'endpoint' => 'https://api.themoviedb.org/3/movie/upcoming'],
            // Tambahkan kategori lain jika diperlukan
        ];

        $result = [];

        foreach ($categories as $category) {
            try {
                $response = $this->client->request('GET', $category['endpoint'], [
                    'query' => [
                        'language' => 'id-ID',
                        'page' => 1,
                    ]
                ]);

                $statusCode = $response->getStatusCode();
                if ($statusCode === 200) {
                    $data = json_decode($response->getBody(), true);
                    $movies = $data['results'] ?? [];
                    $formattedMovies = array_map(function ($movie) {
                        return [
                            'id' => $movie['id'],
                            'title' => $movie['title'],
                            'imageUrl' => 'https://image.tmdb.org/t/p/w500' . $movie['poster_path'],
                        ];
                    }, $movies);

                    $result[] = [
                        'id' => $category['id'],
                        'name' => $category['name'],
                        'movies' => $formattedMovies,
                    ];
                }
            } catch (RequestException $e) {
                Log::error('TMDB API Error for category ' . $category['name'] . ': ' . $e->getMessage());
            }
        }

        return $result;
    }
}
