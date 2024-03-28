<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repair;
use App\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class RepairController extends Controller
{
    //insert into `repairs` (`description`, `status`, `startDate`, `endDate`, `clientNotes`, `mechanicID`, `updated_at`, `created_at`) values (test, test, 2024-03-27, 2024-03-30, test, 1, 2024-03-28 14:23:54, 2024-03-28 14:23:54)
    public function store(Request $request)
    {
        // dd($request->vehicle_id);
        // Your code here
        $repair = Repair::create([
            'vehicleID' => $request->vehicle_id,
            'description' => $request->description,
            'status' => $request->status,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'clientNotes' => $request->clientNotes,
            'mechanicID' => auth()->user()->id,
        ]);
    }
    public function selectToRepair(Request $request)
    {
        $userId = auth()->user()->id;
        $vehicles = Vehicle::where('clientID', $userId)->get();

        // dd($vehicles);
        return Inertia::render('repairs/SelectVehicle', ['vehicles' => $vehicles]);
    }
    public function redirectForm(Request $request)
    {
        // dd($request->id);
        $vehicleId = $request->id;
        return Inertia::render('repairs/RepairRequestForm', ['vehicleId' => $vehicleId]);
    }
}
