<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OtpController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RegistrationController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/otp/send', [OtpController::class, 'sendOtp']);
Route::post('/otp/verify', [OtpController::class, 'verifyOtp']);

// Event routes (public)
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{id}', [EventController::class, 'show']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [UserController::class, 'profile']);
    Route::put('/user', [UserController::class, 'updateProfile']);
    
    // Event registration
    Route::post('/events/{id}/register', [EventController::class, 'register']);
    
    // Ticket routes
    Route::get('/ticket/{ticketNumber}', [RegistrationController::class, 'getTicket']);
    Route::post('/ticket/{ticketNumber}/check-in', [RegistrationController::class, 'checkIn']);
    Route::get('/registrations', [RegistrationController::class, 'getUserRegistrations']);
    Route::post('/registrations/{ticketNumber}/cancel', [RegistrationController::class, 'cancel']);
    
    // Event admin routes
    Route::post('/events', [EventController::class, 'store']);
});
