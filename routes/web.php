<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieDetailsController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WatchMovieController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminMovieController;
use App\Http\Controllers\Admin\AdminSettingController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
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

Route::middleware(['auth', 'admin'])->group(function () {
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('dashboard');
        Route::get('/users', [AdminUserController::class, 'index'])->name('users');
        Route::post('/users', [AdminUserController::class, 'store'])->name('user.store');
        Route::put('/users/{id}', [AdminUserController::class, 'update'])->name('user.update');
        Route::delete('/users/{id}', [AdminUserController::class, 'destroy'])->name('user.destroy');
        Route::get('/movies', [AdminMovieController::class, 'index'])->name('movies');
        Route::get('/settings', [AdminSettingController::class, 'index'])->name('settings');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/movie/{id}', [MovieDetailsController::class, 'index'])->name('moviedetails.movie');

Route::get('/watch/{id}', [WatchMovieController::class, 'watch'])->name('watch.movie');


require __DIR__ . '/auth.php';
