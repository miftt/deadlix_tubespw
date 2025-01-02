<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MovieDetailsController;
use App\Http\Controllers\MovieGenreController;
use App\Http\Controllers\MovieSearchController;
use App\Http\Controllers\PremiumController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WatchMovieController;
use App\Http\Controllers\WatchlistController;
use App\Http\Controllers\DashboardAdminController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\TransactionPDFController;
use App\Http\Controllers\Auth\GoogleController;
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

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::put('/password', [PasswordController::class, 'update'])->name('password.update');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.photo.store');
});

Route::get('/movie/{id}', [MovieDetailsController::class, 'index'])->name('moviedetails.movie');

Route::get('/watch/{id}', [WatchMovieController::class, 'watch'])->name('watch.movie');

Route::get('/api/movies/search', [MovieSearchController::class, 'search'])->name('movies.search');

Route::get('/movies', [MovieGenreController::class, 'index'])->name('movies.index');
Route::get('/movies/genre/{id}', [MovieGenreController::class, 'show'])->name('movies.genre.show');

Route::middleware('auth')->group(function () {
    Route::get('/watchlist', [WatchlistController::class, 'index'])->name('watchlist.index');
    Route::get('/api/watchlist', [WatchlistController::class, 'show'])->name('watchlist.show');
    Route::post('/watchlist/handle', [WatchlistController::class, 'handleWatchlist'])->name('watchlist.handle');
});

Route::get('/premium', [PremiumController::class, 'index'])->name('premium.index');

Route::middleware('auth')->group(function () {
    Route::post('/api/checkout', [PremiumController::class, 'process'])->name('api.checkout');
    Route::get('/checkout/{id}', [PremiumController::class, 'checkout'])->name('checkout.checkout');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/premium/success/{transaction}', [PremiumController::class, 'success'])->name('premium.success');
    Route::post('/premium/transaction/{id}', [PremiumController::class, 'updateTransaction']);
    Route::get('/premium/success/{id}', [PremiumController::class, 'success'])->name('premium.success');
    Route::get('/premium/failed/{id}', [PremiumController::class, 'failed'])->name('premium.failed');
});

Route::post('/api/midtrans-callback', [PremiumController::class, 'handleCallback'])->name('midtrans.callback');

// Admin routes
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [DashboardAdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::get('/admin/transactions', [DashboardAdminController::class, 'transactions'])->name('admin.transactions');
    // Existing user management routes
    Route::resource('admin/users', DashboardAdminController::class)->names([
        'index' => 'admin.users.index',
        'create' => 'admin.users.create',
        'store' => 'admin.users.store',
        'edit' => 'admin.users.edit',
        'update' => 'admin.users.update',
        'destroy' => 'admin.users.destroy',
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/history', [DashboardController::class, 'history'])->name('dashboard.history');
});

// Route::get('/premium/failed/{transaction}', [PremiumController::class, 'failed'])
//     ->middleware(['auth'])
//     ->name('premium.failed')
//     ->where('transaction', '[0-9a-fA-F\-]+');

Route::get('/transaction/{id}/pdf', [TransactionPDFController::class, 'generatePDF'])
    ->name('transaction.pdf')
    ->middleware(['auth']);

Route::get('auth/google', [GoogleController::class, 'redirectToGoogle'])->name('google.redirect');
Route::get('auth/google/callback', [GoogleController::class, 'handleGoogleCallback'])->name('google.callback');

require __DIR__ . '/auth.php';
