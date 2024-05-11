<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repair;
use Inertia\Inertia;
use App\Models\User;
class MechanicController extends Controller
{
    //
    public function repairs(Request $request)
    {
        $id = auth()->user()->id;
        // dd($id);
        $repairs = Repair::where('mechanicID', $id)->get();
        // dd($repairs);
        return Inertia::render('Mechanic/Repairs', ['repairs' => $repairs]);
    }
}
