<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieDetailsController;
use App\Http\Controllers\MovieGenreController;
use App\Http\Controllers\MovieSearchController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WatchMovieController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', [HomeController::class, 'index'])->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/movie/{id}', [MovieDetailsController::class, 'index'])->name('moviedetails.movie');

Route::get('/watch/{id}', [WatchMovieController::class, 'watch'])->name('watch.movie');

Route::get('/api/movies/search', [MovieSearchController::class, 'search'])->name('movies.search');

Route::get('/movies', [MovieGenreController::class, 'index'])->name('movies.index');
Route::get('/movies/genre/{id}', [MovieGenreController::class, 'show'])->name('movies.genre.show');
require __DIR__ . '/auth.php';
