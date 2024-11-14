<?php

namespace App\Http\Controllers;

use App\Services\TMDBService;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    protected $tmdb;

    public function __construct(TMDBService $tmdb)
    {
        $this->tmdb = $tmdb;
    }

    /**
     * Menampilkan halaman Home dengan konten unggulan dan kategori film.
     */
    public function index(): Response
    {
        $featuredContent = $this->tmdb->getFeaturedContent();
        $categories = $this->tmdb->getCategories();
        // Tambahkan log untuk memeriksa data yang dikirim
        Log::info('Featured Content:', $featuredContent ? [$featuredContent] : ['null']);
        Log::info('Categories:', $categories);


        return Inertia::render('Home', [
            'featuredContent' => $featuredContent,
            'categories' => $categories,
            'searchResults' => [],
        ]);
    }
}
