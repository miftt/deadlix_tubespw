<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'featuredContent' => [
                'title' => 'Stranger Things',
                'description' => 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.',
                'imageUrl' => '/images/hero.png',
            ],
            'categories' => [
                [
                    'id' => 1,
                    'name' => 'Trending Now',
                    'movies' => [
                        ['id' => 1, 'title' => 'Movie 1', 'imageUrl' => '/images/hero.png'],

                    ],
                ],
            ],
        ]);
    }
}
