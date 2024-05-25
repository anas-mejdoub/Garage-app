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
        dd($request);
        $notifications = Notification::where('user_id', $request->userId)->get();

        // return response()->json($notifications);
        return Inertia::render('Notifications', [
            'notifications' => $notifications
        ]);
    }
}
