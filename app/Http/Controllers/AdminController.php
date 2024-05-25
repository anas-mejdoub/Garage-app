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

        $data = [
            'totalUsers' => User::count(),
            'totalRepairs' => Repair::count(),
            'users' => $users,
        ];

        return Inertia::render('Admin/Dashboard', $data);
    }
    public function getMecanics()
    {
        $mechanics = User::where('role', 'mecanic')->get();
        return Inertia::render('Admin/Mechanic', ['mechanics' => $mechanics]);
    }

    public function repairsRequest()
    {
        $repairs = Repair::where('status','pending')->get();
        $mechanics = User::where('role', 'mecanic')->get();
        return Inertia::render('Admin/RepairsRequests', ['repairs' => $repairs, 'mechanics' => $mechanics]);
    }
    public function ForwardMecanic(Request $request)
    {
        //dd($request->selectedMechanic);
        $repairid = $request->selectedRepair;
        $mecanicid = $request->selectedMechanic;
        $repair = Repair::where('id', $repairid)->first();
        $repair->mechanicID = $mecanicid;
        $repair->save();
    }
    public function NewRequest()
    {
//        $repairid = $request->selectedRepair;
        $repairs = Repair::join('vehicles', 'repairs.vehicleID', '=', 'vehicles.id')
            ->where('repairs.status', 'Review')
            ->select('repairs.*', 'vehicles.photos as vehicle_photos')
            ->get();

        return Inertia::render('Admin/NewRequest', ['repairs' => $repairs]);
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
        $invoice = Invoice::where('repairID', $repairid)->first();
        if (!$invoice)
        {
            $invoice = Invoice::create([
                'repairID' => $repairid,
                'totalAmount' => $request->price,
                'additionalCharges' => 0,
            ]);
        }
        $msg = "your repair of " . $request->vehicleID . " start date has been set to " . $request->startDate . " and the end date will be " . $request->endDate;
        $vehicleId = $request->selectedRequest;

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
