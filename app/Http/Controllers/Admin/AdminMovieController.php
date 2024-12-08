<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminMovieController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Movies');
    }
}
