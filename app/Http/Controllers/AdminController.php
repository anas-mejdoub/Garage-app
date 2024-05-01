<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Repair; 
class AdminController extends Controller
{
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
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