<?php

namespace App\Http\Controllers;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    //
    
    public function store(Request $request)
    {
        $request->validate([
            'make' => 'required|string',
            'model' => 'required|string',
            'fuelType' => 'required|string',
            'registration' => 'required|string',
            'photos' => 'nullable|image',
        ]);
        $photoPath = null;
        if ($request->hasFile('photos')) {
            $photoPath = $request->file('photos')->store('photos', 'public');
        }
        // dd(auth()->user()->id);
        $vehicle = Vehicle::create([
            'make' => $request->make,
            'model' => $request->model,
            'fuelType' => $request->fuelType,
            'registration' => $request->registration,
            'photos' => $photoPath,
            'clientID' => auth()->user()->id,
        ]);


        // // Redirect the user to a success page
        return redirect('/my-vehicles');
    }
    // In VehicleController.php
    public function userVehicles()
    {
        $userId = auth()->user()->id;
        $vehicles = Vehicle::where('clientID', $userId)->get();

        // dd($vehicles);
        return Inertia::render('Vehicles/Index', ['vehicles' => $vehicles]);
    }
}
