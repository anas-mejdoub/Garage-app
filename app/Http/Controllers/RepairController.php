<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repair;
use App\Models\Vehicle;
use Inertia\Inertia;
use Inertia\Response;

class RepairController extends Controller
{
    public function store(Request $request)
    {
        $repair = Repair::create([
            'vehicleID' => $request->vehicle_id,
            'description' => $request->description,
            'status' => "Review",
            'startDate' => date('Y-m-d'),//$request->startDate,
            'endDate' => date('Y-m-d'),//$request->endDate,
            'clientNotes' => $request->clientNotes,
            'mechanicID' => auth()->user()->id,
        ]);
    }
    public function selectToRepair(Request $request)
    {
        $userId = auth()->user()->client->id;
        $vehicles = Vehicle::where('clientID', $userId)->get();

        return Inertia::render('repairs/SelectVehicle', ['vehicles' => $vehicles]);
    }
    public function redirectForm(Request $request)
    {
        $vehicleId = $request->id;
        return Inertia::render('repairs/RepairRequestForm', ['vehicleId' => $vehicleId]);
    }
    public function history(Request $request)
    {
        if (auth()->user() && auth()->user()->id)
        {
            $userId = auth()->user()->id;
            $repairs = Repair::where('mechanicID', $userId)->get();
            return Inertia::render('repairs/History', ['repairs' => $repairs]);
        }
        return Inertia::render('repairs/History', ['repairs' => null]);
            
    }
}
