<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;
use App\Models\Repair;
use App\Models\Vehicle;
use App\Models\Client;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        if ($request->id != auth()->user()->id)
        {
           return redirect('/not_found');
        }
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
            $cid = Client::where('userID', $request->id)->first()->id;
            $repair = Repair::join('vehicles', 'repairs.vehicleID', '=', 'vehicles.id')
                 ->where('vehicles.clientID', $cid)
                 ->select('repairs.*')
                 ->orderBy('created_at', 'desc')
                 ->first();
          $repairs = Repair::join('vehicles', 'repairs.vehicleID', '=', 'vehicles.id')
          ->where('vehicles.clientID', $cid)
          ->select('repairs.*')
          ->get();
        //   dd($repairs);

            return Inertia::render('Client/Dashboard', ['auth' => auth()->user() ,'notifications' => $notifications, 'repair' => $repair, 'repairs' => $repairs]);
        }
        return Inertia::render('MiniDsh', ['auth' => auth()->user() ,'notifications' => $notifications]);
    }
}
