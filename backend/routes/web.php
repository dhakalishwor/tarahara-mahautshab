<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PageController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return redirect('/events');
})->name('home');

// Event routes (public)
Route::get('/events', [PageController::class, 'eventsList'])->name('events.list');
Route::get('/events/{id}', [PageController::class, 'eventDetails'])->name('events.details');

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/dashboard', [PageController::class, 'dashboard'])->name('dashboard');
    Route::get('/ticket/{ticketNumber}', [PageController::class, 'ticketConfirmation'])->name('ticket.confirmation');
    Route::post('/events/{id}/register', [PageController::class, 'registerEvent'])->name('event.register');
});
