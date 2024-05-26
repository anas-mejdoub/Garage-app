<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    //
    public function index(Request $request)
    {
        // dd($request->user['id']);
        // dd($request->id);
        // dd($request->id);
        $notifications = Notification::where('user_id', $request->id)->get();
        return Inertia::render('MiniDsh', ['auth' => auth()->user() ,'notifications' => $notifications]);
        // return redirect('/ndashboard');
    }
}
