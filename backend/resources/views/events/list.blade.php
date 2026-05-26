@extends('layouts.app')

@section('title', 'Events - Tarahara Mahautshab')

@section('content')
<div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900 mb-2">Events</h1>
            <p class="text-gray-600 text-lg">Browse and register for upcoming events</p>
        </div>

        <!-- Events Grid -->
        <div id="events-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @forelse($events as $event)
                <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                    <!-- Event Image -->
                    <div class="h-48 bg-gray-200 overflow-hidden">
                        @if($event['image_url'])
                            <img src="{{ $event['image_url'] }}" alt="{{ $event['name'] }}" class="w-full h-full object-cover">
                        @else
                            <div class="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-5xl font-bold">
                                {{ substr($event['name'], 0, 1) }}
                            </div>
                        @endif
                    </div>

                    <!-- Event Info -->
                    <div class="p-6">
                        <!-- Remaining Slots Badge -->
                        <div class="mb-3">
                            @if($event['remaining_slots'] > 0)
                                <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                                    {{ $event['remaining_slots'] }} slots available
                                </span>
                            @else
                                <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-semibold">
                                    Sold Out
                                </span>
                            @endif
                        </div>

                        <!-- Event Title -->
                        <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $event['name'] }}</h3>

                        <!-- Event Description (truncated) -->
                        <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                            {{ Str::limit($event['description'], 100) }}
                        </p>

                        <!-- Event Details -->
                        <div class="space-y-2 mb-4 text-sm text-gray-600">
                            <p class="flex items-center gap-2">
                                <span>📅</span>
                                {{ \Carbon\Carbon::parse($event['date'])->format('M j, Y') }}
                            </p>
                            <p class="flex items-center gap-2">
                                <span>⏰</span>
                                {{ $event['time'] }}
                            </p>
                            <p class="flex items-center gap-2">
                                <span>📍</span>
                                {{ $event['location'] }}
                            </p>
                        </div>

                        <!-- Capacity Bar -->
                        <div class="mb-4">
                            @php
                                $capacity_percentage = ($event['registered_count'] / $event['capacity']) * 100;
                            @endphp
                            <div class="w-full bg-gray-200 rounded-full h-2">
                                <div class="bg-blue-600 h-2 rounded-full" style="width: {{ $capacity_percentage }}%"></div>
                            </div>
                            <p class="text-xs text-gray-500 mt-1">
                                {{ $event['registered_count'] }}/{{ $event['capacity'] }} registered
                            </p>
                        </div>

                        <!-- Action Buttons -->
                        <div class="flex gap-2">
                            <a href="{{ route('events.details', $event['id']) }}" 
                               class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center text-sm font-medium">
                                View Details
                            </a>
                            
                            @auth
                                @if($event['remaining_slots'] > 0)
                                    <form method="POST" action="{{ route('event.register', ['id' => $event['id']]) }}" class="flex-1">
                                        @csrf
                                        <button type="submit" class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium">
                                            Register
                                        </button>
                                    </form>
                                @else
                                    <button disabled class="flex-1 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed text-sm font-medium">
                                        Sold Out
                                    </button>
                                @endif
                            @else
                                <a href="{{ route('login') }}" 
                                   class="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-center text-sm font-medium">
                                    Login
                                </a>
                            @endauth
                        </div>
                    </div>
                </div>
            @empty
                <div class="col-span-full bg-white rounded-lg shadow-md p-12 text-center">
                    <p class="text-gray-600 text-lg mb-4">No events available at the moment</p>
                    <p class="text-gray-500">Please check back later for upcoming events</p>
                </div>
            @endforelse
        </div>
    </div>
</div>
@endsection
