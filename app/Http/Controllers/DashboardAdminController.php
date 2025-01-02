<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class DashboardAdminController extends Controller
{
    public function index()
    {
        $users = User::latest()->paginate(10);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,admin'
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role']
        ]);

        return redirect()->route('admin.users.index')
            ->with('message', 'User created successfully');
    }

    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|in:user,admin'
        ]);

        if ($request->filled('password')) {
            $request->validate([
                'password' => 'required|string|min:8'
            ]);
            $validated['password'] = Hash::make($request->password);
        }

        $user->update($validated);

        return redirect()->route('admin.users.index')
            ->with('message', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('message', 'User deleted successfully');
    }

    public function dashboard()
    {
        // Get total earnings this month
        $currentMonthEarnings = Transaction::whereRaw("strftime('%m', created_at) = ?", [now()->format('m')])
            ->whereRaw("strftime('%Y', created_at) = ?", [now()->format('Y')])
            ->where('status', 'completed')
            ->sum('price');

        // Get new users this month
        $newUsersThisMonth = User::whereRaw("strftime('%m', created_at) = ?", [now()->format('m')])
            ->whereRaw("strftime('%Y', created_at) = ?", [now()->format('Y')])
            ->count();

        // Get premium users count
        $premiumUsersCount = User::whereHas('subscription', function ($query) {
            $query->where('status', 'active');
        })->count();
        // Get earnings for last 6 months using SQLite date functions
        $monthlyEarnings = Transaction::where('status', 'completed')
            ->whereBetween('created_at', [now()->subMonths(5), now()])
            ->selectRaw("strftime('%m', created_at) as month")
            ->selectRaw("strftime('%Y', created_at) as year")
            ->selectRaw('SUM(price) as total')
            ->orderBy('year')
            ->orderBy('month')
            ->get()
            ->map(function ($item) {
                return [
                    'month' => date('F Y', mktime(0, 0, 0, (int)$item->month, 1, (int)$item->year)),
                    'total' => $item->total
                ];
            });

        // Get recent transactions, showing only completed ones
        $recentTransactions = Transaction::with('user')
            ->where('status', 'completed')
            ->latest()
            ->take(5)
            ->get();


        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'currentMonthEarnings' => $currentMonthEarnings,
                'newUsersThisMonth' => $newUsersThisMonth,
                'totalUsers' => User::count(),
                'premiumUsers' => $premiumUsersCount,
                'monthlyEarnings' => $monthlyEarnings,
                'recentTransactions' => $recentTransactions
            ]
        ]);
    }

    public function transactions()
    {
        $transactions = Transaction::with('user')
            ->latest()
            ->paginate(5);

        return Inertia::render('Admin/Transactions/Index', [
            'transactions' => $transactions
        ]);
    }
}
