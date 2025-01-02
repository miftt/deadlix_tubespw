<?php

namespace App\Http\Controllers;


use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Transaction;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $subscription = $user->subscription;

        return Inertia::render('Dashboard/Index', [
            'subscription' => $subscription ? [
                'plan' => $subscription->product->name,
                'validUntil' => $subscription->expires_at,
                'status' => $subscription->status,
            ] : null,
            'user' => $user,
        ]);
    }

    public function history()
    {
        $transactions = Transaction::with('product')
            ->where('user_id', auth()->id())
            ->latest()
            ->paginate(10);

        return Inertia::render('Dashboard/History', [
            'transactions' => $transactions
        ]);
    }
}
