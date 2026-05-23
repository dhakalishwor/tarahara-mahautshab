<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    /**
     * Get all events
     */
    public function index()
    {
        try {
            $events = Event::select('id', 'name', 'description', 'date', 'time', 'location', 'capacity', 'registered_count', 'image_url')
                ->orderBy('date', 'asc')
                ->get()
                ->map(function ($event) {
                    return [
                        'id' => $event->id,
                        'name' => $event->name,
                        'description' => $event->description,
                        'date' => $event->date,
                        'time' => $event->time,
                        'location' => $event->location,
                        'capacity' => $event->capacity,
                        'registered_count' => $event->registered_count,
                        'remaining_slots' => $event->getRemainingSlots(),
                        'image_url' => $event->image_url,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $events,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch events',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get event details by ID
     */
    public function show($id)
    {
        try {
            $event = Event::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $event->id,
                    'name' => $event->name,
                    'description' => $event->description,
                    'date' => $event->date,
                    'time' => $event->time,
                    'location' => $event->location,
                    'capacity' => $event->capacity,
                    'registered_count' => $event->registered_count,
                    'remaining_slots' => $event->getRemainingSlots(),
                    'image_url' => $event->image_url,
                    'agenda' => $event->agenda,
                    'latitude' => $event->latitude,
                    'longitude' => $event->longitude,
                    'has_available_slots' => $event->hasAvailableSlots(),
                ],
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch event details',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Create a new event (Admin only)
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'date' => 'required|date',
                'time' => 'required|date_format:H:i',
                'location' => 'required|string|max:255',
                'capacity' => 'required|integer|min:1',
                'image_url' => 'nullable|url',
                'agenda' => 'nullable|array',
                'latitude' => 'nullable|numeric',
                'longitude' => 'nullable|numeric',
            ]);

            $event = Event::create($validated);

            return response()->json([
                'success' => true,
                'message' => 'Event created successfully',
                'data' => $event,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Register user for an event
     */
    public function register(Request $request, $id)
    {
        try {
            $event = Event::findOrFail($id);

            // Check if user already registered
            $existingRegistration = $event->registrations()
                ->where('user_id', $request->user()->id)
                ->first();

            if ($existingRegistration) {
                return response()->json([
                    'success' => false,
                    'message' => 'You are already registered for this event',
                ], 409);
            }

            // Check if event has available slots
            if (!$event->hasAvailableSlots()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Event registration is full',
                ], 422);
            }

            // Generate unique ticket number
            $ticketNumber = 'TKT-' . $event->id . '-' . time() . '-' . $request->user()->id;

            // Create registration
            $registration = $event->registrations()->create([
                'user_id' => $request->user()->id,
                'ticket_number' => $ticketNumber,
                'status' => 'confirmed',
            ]);

            // Increment registered count
            $event->increment('registered_count');

            return response()->json([
                'success' => true,
                'message' => 'Successfully registered for event',
                'data' => [
                    'registration_id' => $registration->id,
                    'ticket_number' => $registration->ticket_number,
                    'status' => $registration->status,
                    'event_id' => $event->id,
                    'event_name' => $event->name,
                ]
            ], 201);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Event not found',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to register for event',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
