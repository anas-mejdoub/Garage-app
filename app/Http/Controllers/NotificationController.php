<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = Notification::where('user_id', $request->id)->get();
        if (auth()->user()->role == 'admin')
        {
            return Inertia::render('MiniDsh', ['auth' => auth()->user() ,'notifications' => $notifications]);
        }
        else if (auth()->user()->role == 'mechanic')
        {
            return Inertia::render('MiniDsh', ['auth' => auth()->user() ,'notifications' => $notifications]);
        }
        else if (auth()->user()->role == 'client')
        {
            return Inertia::render('Client/Dashboard', ['auth' => auth()->user() ,'notifications' => $notifications]);
        }
        return Inertia::render('MiniDsh', ['auth' => auth()->user() ,'notifications' => $notifications]);
    }
}
