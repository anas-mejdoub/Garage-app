<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;

class ClientController extends Controller
{
    //
    public function index()
    {
        $clients = Client::all();
        return Inertia::render('Clients/Index', ['clients' => $clients]);
    }
    public function store(Request $request)
    {
        // dd(auth()->user()->id);
        // $vehicle =  Vehicle::create([
        //     'make' => $request->make,
        //     'model' => $request->model,
        //     'fuelType' => $request->fuelType,
        //     'registration'=> $request->registration,
        //     'photos'=> $request->photos,
        //     'clientID' => auth()->user()->id,
        // ]);
        $clients = Client::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'address'=> $request->address,
            'city'=> $request->city,
            'postcode'=> $request->postcode,
            'country'=> $request->country,
            'company'=> $request->company,
            'companyNumber'=> $request->companyNumber,
            'vatNumber'=> $request->vatNumber,
            // 'clientID' => auth()->user()->id,
        ]);

        // // Redirect the user to a success page
        return redirect('/');
    }
}
