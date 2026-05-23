<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class OtpController extends Controller
{
    public function sendOtp(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|string',
        ]);

        $otp = rand(100000, 999999);
        $phoneNumber = $request->phone_number;

        // Store OTP in cache for 5 minutes
        Cache::put('otp_' . $phoneNumber, $otp, now()->addMinutes(5));

        // In a real application, you would send the OTP via an SMS provider here
        // e.g., Twilio::message($phoneNumber, "Your OTP is: $otp");

        return response()->json([
            'message' => 'OTP sent successfully (Simulated)',
            'expires_in' => '5 minutes'
        ]);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'phone_number' => 'required|string',
            'otp' => 'required|string',
        ]);

        $phoneNumber = $request->phone_number;
        $cachedOtp = Cache::get('otp_' . $phoneNumber);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return response()->json([
                'message' => 'Invalid or expired OTP'
            ], 400);
        }

        // OTP verified successfully, clear it
        Cache::forget('otp_' . $phoneNumber);

        return response()->json([
            'message' => 'OTP verified successfully'
        ]);
    }
}
