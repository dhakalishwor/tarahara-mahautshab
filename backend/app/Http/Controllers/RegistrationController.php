<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

class RegistrationController extends Controller
{
    /**
     * Get ticket details by ticket number
     */
    public function getTicket(Request $request, $ticketNumber)
    {
        try {
            $registration = Registration::where('ticket_number', $ticketNumber)
                ->where('user_id', $request->user()->id)
                ->with('event')
                ->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => [
                    'registration' => [
                        'id' => $registration->id,
                        'ticket_number' => $registration->ticket_number,
                        'status' => $registration->status,
                        'created_at' => $registration->created_at,
                    ],
                    'event' => [
                        'id' => $registration->event->id,
                        'name' => $registration->event->name,
                        'description' => $registration->event->description,
                        'date' => $registration->event->date,
                        'time' => $registration->event->time,
                        'location' => $registration->event->location,
                        'image_url' => $registration->event->image_url,
                        'agenda' => $registration->event->agenda,
                    ]
                ]
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ticket not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch ticket details',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Check in for an event using ticket
     */
    public function checkIn(Request $request, $ticketNumber)
    {
        try {
            $registration = Registration::where('ticket_number', $ticketNumber)
                ->where('user_id', $request->user()->id)
                ->firstOrFail();

            // Check if already checked in
            if ($registration->status === 'checked_in') {
                return response()->json([
                    'success' => false,
                    'message' => 'You have already checked in for this event',
                ], 409);
            }

            // Update status to checked_in
            $registration->status = 'checked_in';
            $registration->save();

            return response()->json([
                'success' => true,
                'message' => 'Successfully checked in',
                'data' => [
                    'ticket_number' => $registration->ticket_number,
                    'status' => $registration->status,
                    'checked_in_at' => $registration->updated_at,
                ]
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Ticket not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to check in',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all registrations for authenticated user
     */
    public function getUserRegistrations(Request $request)
    {
        try {
            $registrations = Registration::where('user_id', $request->user()->id)
                ->with('event')
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($registration) {
                    return [
                        'id' => $registration->id,
                        'ticket_number' => $registration->ticket_number,
                        'status' => $registration->status,
                        'event' => [
                            'id' => $registration->event->id,
                            'name' => $registration->event->name,
                            'date' => $registration->event->date,
                            'time' => $registration->event->time,
                        ],
                        'created_at' => $registration->created_at,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $registrations,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch registrations',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Cancel registration
     */
    public function cancel(Request $request, $ticketNumber)
    {
        try {
            $registration = Registration::where('ticket_number', $ticketNumber)
                ->where('user_id', $request->user()->id)
                ->firstOrFail();

            // Check if already checked in
            if ($registration->status === 'checked_in') {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot cancel after checking in',
                ], 422);
            }

            // Update status to cancelled
            $registration->status = 'cancelled';
            $registration->save();

            // Decrement event registered count
            $registration->event()->decrement('registered_count');

            return response()->json([
                'success' => true,
                'message' => 'Registration cancelled successfully',
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Registration not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to cancel registration',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
