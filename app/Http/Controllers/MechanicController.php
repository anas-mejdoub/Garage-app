<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Repair;
use App\Models\SparePart;
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
    public function changeStatus(Request $request)
    {
        $id = auth()->user()->id;
        // dd($request->newStatus);
        // dd($request->currentRepai/r);
        $repair_id = $request->currentRepair['id'];
        $repair = Repair::where('id', $repair_id)->first();
        $repair->status = $request->newStatus;
        // dd($r/epair);
        $repair->save();
    }
    public function WorkingRepairs(Request $request)
    {
//        dd($parts);
        $repair = Repair::where('id', $request->id)->first();
        $parts = SparePart::all();
        return Inertia::render('Mechanic/WorkingRepairs', ['repair' => $repair, 'parts' => $parts]);
    }
}
