<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Repair;
use Illuminate\Support\Facades\Hash;
class AdminController extends Controller
{
    public function destroy($id)
    {
        if ($id == auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete your own account');
        }
        $user = User::find($id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }
        if ($user->isAdmin) {
            return redirect()->back()->with('error', 'Cannot delete admin user');
        }
        if ($user->client) {
            $user->client->delete();
        }
        $user->delete();
        $users = User::all();
        
        $data = [
            'totalUsers' => User::count(),
            'totalRepairs' => Repair::count(),
            'users' => $users,
        ];
        return Inertia::render('Admin/Dashboard', $data);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return redirect()->back()->with('success', 'User created successfully');
    }
    public function dashboard()
    {
        // Ensure the user is an admin
        // <dd></dd>
        // $/dd(auth()->user);
        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
        $users = User::all();
        
        $data = [
            'totalUsers' => User::count(),
            'totalRepairs' => Repair::count(),
            'users' => $users,
        ];

        return Inertia::render('Admin/Dashboard', $data);
    }
}