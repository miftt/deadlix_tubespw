<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Ramsey\Uuid\Rfc4122\UuidV4;

class AdminUserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role', 'created_at', 'status', 'is_admin', 'updated_at')
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('Admin/Users', [
            'users' => $users
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'role' => 'required|string|max:255',
            ]);

            $uuid = UuidV4::uuid4()->toString();
            Log::info('UUID generated', ['uuid' => $uuid]);

            $user = User::create([
                'id' => $uuid,
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role'],
                'is_admin' => false,
            ]);

            Log::info('User created successfully', ['user_id' => $user->id]);

            return redirect()->route('admin.users')
                ->with('message', 'User created successfully');
        } catch (\Exception $e) {
            Log::error('Failed to create user', [
                'error' => $e->getMessage(),
                'request' => $request->except('password')
            ]);

            return redirect()->back()
                ->withErrors(['error' => 'Failed to create user. Please try again.'])
                ->withInput($request->except('password'));
        }
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'id' => 'required|string|max:255',
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255',
                'role' => 'required|string|max:255',
                'status' => 'required|string|max:255',
                'is_admin' => 'required|boolean',
            ]);


            // Check if the email is different from the current user's email  
            if ($validated['email'] !== $user->email) {
                // Additional unique email validation  
                $existingUser = User::where('email', $validated['email'])->where('id', '!=', $validated['id'])->first();

                if ($existingUser) {
                    // Email already exists for another user  
                    return redirect()->back()
                        ->withErrors(['email' => 'The email has already been taken.'])
                        ->withInput($request->except('password'));
                }
            }

            // Update user with the new information  
            $updateData = [
                'name' => $validated['name'],
                'role' => $validated['role'],
                'status' => $validated['status'],
                'is_admin' => $validated['is_admin'],
            ];

            // Only add email to update data if it's different  
            if ($validated['email'] !== $user->email) {
                $updateData['email'] = $validated['email'];
            }

            User::where('id', $validated['id'])->update($updateData);

            Log::info('User updated successfully', ['user_id' => $validated['id']]);

            return redirect()->route('admin.users')
                ->with('message', 'User updated successfully');
        } catch (\Exception $e) {
            Log::error('Failed to update user', [
                'error' => $e->getMessage(),
                'user_id' => $user->id,
                'request' => $request->all()
            ]);

            return redirect()->back()
                ->withErrors(['error' => 'Failed to update user. Please try again.'])
                ->withInput();
        }
    }

    public function destroy($id)
{
    try {
        Log::info('Attempting to delete user', ['id' => $id]);
        
        $user = User::findOrFail($id);
        if($user->id !== $id){
            return redirect()->route('admin.users')->with('message', 'You are not allowed to delete this user');
        }
        $user->delete();
        
        Log::info('User deleted successfully', ['user_id' => $id]);
        return redirect()->route('admin.users')
            ->with('message', 'User deleted successfully');
    } catch (\Exception $e) {
        Log::error('Failed to delete user', [
            'error' => $e->getMessage(),
            'user_id' => $id,
            'request' => request()->all()
        ]);
        return redirect()->route('admin.users')
            ->with('error', 'Failed to delete user');
    }
}

}
