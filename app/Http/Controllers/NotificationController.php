<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    //
    public function index(Request $request, $userId)
    {
        dd($request);
        $notifications = Notification::where('user_id', $userId)->get();

        return response()->json($notifications);
    }
}
