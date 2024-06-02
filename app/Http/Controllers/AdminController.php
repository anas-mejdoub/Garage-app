<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Repair;
use App\Models\Vehicle;
use App\Models\Notification;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function destroy($id)
    {
        if ($id == auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete your own account');
        }
        $user = User::find($id);

        if (!$user) {
            return redirect()->back()->with('error', 'User not found');
        }
        if ($user->isAdmin) {
            return redirect()->back()->with('error', 'Cannot delete admin user');
        }
        if ($user->client) {
            $user->client->delete();
        }
        $user->delete();
        $users = User::all();

        $data = [
            'totalUsers' => User::count(),
            'totalRepairs' => Repair::count(),
            'users' => $users,
            'notifications' => Notification::all(),
            'auth' =>auth()->user(),

        ];
        return Inertia::render('Admin/Dashboard', $data);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'client',
        ]);

        $client = Client::create([
            'firstName' => $request->name,
            'lastName' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'userID' => $user->id,
        ]);
        return redirect()->back()->with('success', 'User created successfully');
    }
    public function addMecanic(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make($request->password),
        ]);
        return redirect()->back()->with('success', 'User created successfully');
    }
    public function dashboard()
    {

        if (auth()->user()->role !== 'admin') {
            abort(403, 'Unauthorized action.');
        }
        $users = User::where('role', 'client')->get();
        $notifications = Notification::all();
        $data = [
            'totalUsers' => User::count(),
            'totalRepairs' => Repair::count(),
            'users' => $users,
            'auth' =>auth()->user(),  'notifications' => $notifications
            
        ];

        return Inertia::render('Admin/Users', $data);
    }
    public function getMecanics()
    {
        $notifications = Notification::all();
        $mechanics = User::where('role', 'mecanic')->get();
        return Inertia::render('Admin/Mechanic', ['mechanics' => $mechanics, 'auth' =>auth()->user(),  'notifications' => $notifications]);
    }

    public function repairsRequest()
    {
        $notifications = Notification::all();
        $repairs = Repair::where('status', 'pending')->get();
        $mechanics = User::where('role', 'mecanic')->get();
        return Inertia::render('Admin/RepairsRequests', ['auth' =>auth()->user(),  'notifications' => $notifications,'repairs' => $repairs, 'mechanics' => $mechanics]);
    }
    public function ForwardMecanic(Request $request)
    {
        //dd($request->selectedMechanic);
        $msg = "a repair request with this id : ". $request->selectedRepair . " has been assigned to you";
        Notification::create([
            'user_id' => $request->selectedMechanic,
            'content' => $msg,
        ]);
        $repairid = $request->selectedRepair;
        $mecanicid = $request->selectedMechanic;
        $repair = Repair::where('id', $repairid)->first();
        $repair->mechanicID = $mecanicid;
        $repair->save();
    }
    public function NewRequest()
    {
        $mechanics = User::where('role', 'mecanic')->get();
        $repairs = Repair::join('vehicles', 'repairs.vehicleID', '=', 'vehicles.id')
            ->join('clients', 'vehicles.clientID', '=', 'clients.id')
            ->join('users', 'clients.userID', '=', 'users.id')
            ->where('repairs.status', 'Review')
            ->select('repairs.id as repair_id', 'vehicles.id as vehicle_id', 'clients.id as client_id', 'users.id as user_id', 'repairs.*', 'vehicles.*', 'clients.*', 'users.*')
            ->get();
            $notifications = Notification::all();
        // dd($repairs);
        // $test = Repair::where('status', 'Review')->first();
        // dd($test);
        return Inertia::render('Admin/NewRequest', ['auth' =>auth()->user() ,'repairs' => $repairs, 'mechanics' => $mechanics, 'notifications' => $notifications]);
    }
    public function ChangeRepairDates(Request $request)
    {
        //dd($request->selectedMechanic);
        $repairid = $request->selectedRepair;
        $repair = Repair::where('id', $repairid)->first();
        $repair->startDate = $request->startDate;
        $repair->endDate = $request->endDate;
        $repair->save();
    }
    //DatePriceNewRequest
    public function DatePriceNewRequest(Request $request)
    {
        $repairid = $request->selectedRequest;
        // dd($repairid);
        $invoice = Invoice::where('repairID', $repairid)->first();
        if (!$invoice) {
            $invoice = Invoice::create([
                'repairID' => $repairid,
                'totalAmount' => $request->price,
                'additionalCharges' => 0,
            ]);
        }
        $vehicleId = Repair::where('id', $repairid)->first()->vehicleID;
        $msg = "your repair of " . $vehicleId . " start date has been set to " . $request->startDate . " and the end date will be " . $request->endDate;
        $client = Vehicle::join('clients', 'vehicles.clientId', '=', 'clients.id')
            ->where('vehicles.id', $vehicleId)
            ->select('clients.*')
            ->first();
        $uesrId = $client->userID;
        $clientId = $client->id;
        Notification::create([
            'user_id' => $uesrId,
            'content' => $msg,
        ]);
        $invoice->totalAmount = $request->price;
        $repair = Repair::where('id', $repairid)->first();
        $repair->startDate = $request->startDate;
        $repair->endDate = $request->endDate;
        $repair->status = $request->status;
        $repair->mechanicID = $request->selectedMechanic;
        $repair->save();
        redirect()->back();
    }
    public function completedRepairs()
    {
        $repairs = Repair::join('vehicles', 'repairs.vehicleID', '=', 'vehicles.id')
            ->where('repairs.status', 'completed')
            ->select('repairs.*', 'vehicles.photos as vehicle_photos')
            ->get();
        return Inertia::render('Admin/CompletedRepairs', ['repairs' => $repairs]);
    }
}
