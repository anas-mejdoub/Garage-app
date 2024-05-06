<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\VehicleController;
use App\Http\Controllers\RepairController;
use App\Http\Controllers\AdminController;
use App\Http\Middleware\CheckRole;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::delete('/users/{id}', [AdminController::class, 'destroy']);
Route::get('/invoices', [InvoiceController::class, 'index']);
Route::get('/add-vehicle', function () {
    return Inertia::render('Vehicles/AddVehicle');

});
Route::post('/admin/users', [AdminController::class, 'store']);
Route::post('/admin/add/mecanic', [AdminController::class, 'addMecanic']);
Route::get('/repair-request/{id}', [RepairController::class, 'redirectForm']);
    // return Inertia::render('repairs/RepairRequestForm');
Route::get('/select-vehicle', [RepairController::class, 'selectToRepair']);
Route::get('/admin/add/user', function(){
    return Inertia::render('Admin/Adduser');
});
Route::get('/admin/add/mecanic', function(){
    return Inertia::render('Admin/AddMecanic');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
 });
Route::post('/repair-request', [RepairController::class, 'store']);
Route::post('/vehicles', [VehicleController::class, 'store']);
Route::get('/my-vehicles', [VehicleController::class, 'userVehicles']);
Route::get('/repairs-history', [RepairController::class, 'history']);

Route::get('/clients', [ClientController::class, 'index']);
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
