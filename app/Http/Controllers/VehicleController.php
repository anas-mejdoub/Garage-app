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
        // dd(auth()->user()->id);
        $photoPath = null;
        if ($request->hasFile('photos')) {
            $photoPath = $request->file('photos')->store('photos', 'public');
        }
        if (auth()->user()->client && auth()->user()->client->id)
        {
            $userId = auth()->user()->client->id;
        }
        // dd(auth()->user()->id);
        $vehicle = Vehicle::create([
            'make' => $request->make,
            'model' => $request->model,
            'fuelType' => $request->fuelType,
            'registration' => $request->registration,
            'photos' => $photoPath,
            'clientID' => $userId,
        ]);

        // dd($vehicle);
        return redirect('/my-vehicles');
    }
    public function userVehicles()
    {
        // dd(auth()->user()->client->id);
        if (auth()->user()->client && auth()->user()->client->id)
        {
            $userId = auth()->user()->client->id;
            $vehicles = Vehicle::where('clientID', $userId)->get();
    
            // dd($vehicles);
            return Inertia::render('Vehicles/Index', ['vehicles' => $vehicles]);
        }
        return Inertia::render('Vehicles/Index', ['vehicles' => null]);
        // return Iner
    }
}
