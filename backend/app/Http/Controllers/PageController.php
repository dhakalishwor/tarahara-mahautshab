<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class PageController extends Controller
{
    /**
     * Show events list page
     */
    public function eventsList()
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

            return view('events.list', ['events' => $events]);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to fetch events: ' . $e->getMessage());
        }
    }

    /**
     * Show event details page
     */
    public function eventDetails($id)
    {
        try {
            $event = Event::findOrFail($id);

            $eventData = [
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
            ];

            return view('events.details', ['event' => $eventData]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->with('error', 'Event not found');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to fetch event details: ' . $e->getMessage());
        }
    }

    /**
     * Show user dashboard
     */
    public function dashboard(Request $request)
    {
        try {
            if (!auth()->check()) {
                return redirect()->route('login');
            }

            $user = auth()->user()->load(['registrations' => function ($query) {
                $query->with('event');
            }]);

            return view('user.dashboard', ['user' => $user]);
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to load dashboard: ' . $e->getMessage());
        }
    }

    /**
     * Register user for event (form submission)
     */
    public function registerEvent(Request $request, $id)
    {
        try {
            if (!auth()->check()) {
                return redirect()->route('login')->with('error', 'Please login to register');
            }

            $event = Event::findOrFail($id);

            // Check if user already registered
            $existingRegistration = $event->registrations()
                ->where('user_id', auth()->id())
                ->first();

            if ($existingRegistration) {
                return redirect()->route('events.details', $id)
                    ->with('error', 'You are already registered for this event');
            }

            // Check if event has available slots
            if (!$event->hasAvailableSlots()) {
                return redirect()->route('events.details', $id)
                    ->with('error', 'Event registration is full');
            }

            // Generate unique ticket number
            $ticketNumber = 'TKT-' . $event->id . '-' . time() . '-' . auth()->id();

            // Create registration
            $registration = $event->registrations()->create([
                'user_id' => auth()->id(),
                'ticket_number' => $ticketNumber,
                'status' => 'confirmed',
            ]);

            // Increment registered count
            $event->increment('registered_count');

            return redirect()->route('ticket.confirmation', $ticketNumber)
                ->with('success', 'Successfully registered for event!');
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->with('error', 'Event not found');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to register: ' . $e->getMessage());
        }
    }

    /**
     * Show ticket confirmation page
     */
    public function ticketConfirmation($ticketNumber)
    {
        try {
            if (!auth()->check()) {
                return redirect()->route('login');
            }

            $registration = \App\Models\Registration::where('ticket_number', $ticketNumber)
                ->where('user_id', auth()->id())
                ->with('event')
                ->firstOrFail();

            $ticketData = [
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
            ];

            return view('ticket.confirmation', ['ticket' => $ticketData]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return back()->with('error', 'Ticket not found');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to fetch ticket: ' . $e->getMessage());
        }
    }
}
