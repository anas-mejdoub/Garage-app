<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repair;
use App\Models\Vehicle;

class RepairController extends Controller
{
    //
    public function store(Request $request)
    {
        // Your code here
        $repair = Repair::create([
            'description' => $request->make,
            'status' => $request->status,
            'startDate' => $request->startDate,
            'endDate' => $request->endDate,
            'clientNotes' => $request->clientNotes,
            'clientID' => auth()->user()->id,
        ]);
    }
    public function selectToRepair(Request $request)
    {
        
    }
}
