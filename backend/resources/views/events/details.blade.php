@extends('layouts.app')

@section('title', $event['name'] . ' - Event Details')

@section('content')
<div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative h-96 bg-gray-900">
        @if($event['image_url'])
            <img src="{{ $event['image_url'] }}" alt="{{ $event['name'] }}" class="w-full h-full object-cover opacity-75">
        @else
            <div class="w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600"></div>
        @endif
        
        <div class="absolute inset-0 bg-black bg-opacity-40 flex items-end">
            <div class="container mx-auto px-4 pb-8 text-white">
                <h1 class="text-5xl font-bold mb-2">{{ $event['name'] }}</h1>
                <p class="text-xl opacity-90">
                    {{ \Carbon\Carbon::parse($event['date'])->format('l, F j, Y') }}
                </p>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Left Column - Event Details -->
            <div class="lg:col-span-2">
                <!-- Event Info Cards -->
                <div class="grid grid-cols-3 gap-4 mb-8">
                    <div class="bg-white rounded-lg shadow p-6 text-center">
                        <div class="text-3xl font-bold text-indigo-600 mb-2">{{ $event['time'] }}</div>
                        <div class="text-gray-600">Time</div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6 text-center">
                        <div class="text-3xl font-bold text-indigo-600 mb-2">{{ $event['remaining_slots'] }}</div>
                        <div class="text-gray-600">Slots Available</div>
                    </div>

                    <div class="bg-white rounded-lg shadow p-6 text-center">
                        <div class="text-3xl font-bold text-indigo-600 mb-2">
                            {{ $event['registered_count'] }}/{{ $event['capacity'] }}
                        </div>
                        <div class="text-gray-600">Registered</div>
                    </div>
                </div>

                <!-- Capacity Bar -->
                <div class="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 class="text-lg font-semibold mb-4">Capacity Status</h3>
                    @php
                        $capacity_percentage = ($event['registered_count'] / $event['capacity']) * 100;
                    @endphp
                    <div class="w-full bg-gray-200 rounded-full h-4">
                        <div class="bg-indigo-600 h-4 rounded-full transition-all" 
                             style="width: {{ $capacity_percentage }}%"></div>
                    </div>
                    <p class="text-sm text-gray-600 mt-2">
                        {{ number_format($capacity_percentage, 1) }}% capacity filled
                    </p>
                </div>

                <!-- Description -->
                <div class="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 class="text-2xl font-bold mb-4">About This Event</h3>
                    <p class="text-gray-700 leading-relaxed">{{ $event['description'] }}</p>
                </div>

                <!-- Location -->
                <div class="bg-white rounded-lg shadow p-6 mb-8">
                    <h3 class="text-2xl font-bold mb-4">📍 Location</h3>
                    <p class="text-gray-700 mb-4">{{ $event['location'] }}</p>
                    
                    @if($event['latitude'] && $event['longitude'])
                        <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition" 
                                onclick="toggleMap()">
                            <span id="map-btn-text">View on Map</span>
                        </button>
                        
                        <div id="map-container" class="mt-4 hidden">
                            <iframe width="100%" height="400" style="border: 0; border-radius: 8px;" 
                                    loading="lazy" allowFullScreen=""
                                    src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q={{ $event['latitude'] }},{{ $event['longitude'] }}">
                            </iframe>
                        </div>
                    @endif
                </div>

                <!-- Agenda -->
                @if($event['agenda'] && count($event['agenda']) > 0)
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-2xl font-bold mb-4">📋 Agenda</h3>
                        <div class="space-y-4">
                            @foreach($event['agenda'] as $item)
                                <div class="border-l-4 border-indigo-600 pl-4">
                                    <p class="font-semibold text-gray-900">{{ $item['time'] ?? '' }}</p>
                                    <p class="text-gray-700">{{ $item['activity'] ?? '' }}</p>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif
            </div>

            <!-- Right Column - Registration Card -->
            <div class="lg:col-span-1">
                <div class="bg-white rounded-lg shadow-lg p-6 sticky top-20">
                    <h3 class="text-2xl font-bold mb-4">Event Registration</h3>

                    <div class="mb-6">
                        <div class="text-sm text-gray-600 mb-2">Event Status</div>
                        @if($event['has_available_slots'])
                            <span class="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                ✓ Open for Registration
                            </span>
                        @else
                            <span class="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                                ✗ Sold Out
                            </span>
                        @endif
                    </div>

                    <div class="space-y-4 mb-6 pb-6 border-b">
                        <div class="flex justify-between">
                            <span class="text-gray-600">Date:</span>
                            <span class="font-medium">
                                {{ \Carbon\Carbon::parse($event['date'])->format('M j, Y') }}
                            </span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Time:</span>
                            <span class="font-medium">{{ $event['time'] }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-600">Location:</span>
                            <span class="font-medium text-right text-sm">{{ $event['location'] }}</span>
                        </div>
                    </div>

                    <div id="error-message" class="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-700 text-sm hidden"></div>

                    @auth
                        @if($event['has_available_slots'])
                            <form id="register-form" method="POST" action="{{ route('event.register', ['id' => $event['id']]) }}">
                                @csrf
                                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition mb-3 disabled:bg-gray-400" id="register-btn">
                                    Register Now
                                </button>
                            </form>
                        @else
                            <button disabled class="w-full bg-gray-400 text-white font-semibold py-3 rounded-lg cursor-not-allowed">
                                Registrations Closed
                            </button>
                        @endif
                    @else
                        <a href="{{ route('login') }}" class="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition mb-3 text-center">
                            Login to Register
                        </a>
                    @endauth

                    <button class="w-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-2 rounded-lg transition" onclick="shareEvent()">
                        Share Event
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    function toggleMap() {
        const mapContainer = document.getElementById('map-container');
        const btnText = document.getElementById('map-btn-text');
        mapContainer.classList.toggle('hidden');
        btnText.textContent = mapContainer.classList.contains('hidden') ? 'View on Map' : 'Hide Map';
    }

    function shareEvent() {
        const url = window.location.href;
        const title = '{{ $event['name'] }}';
        
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'Check out this event: ' + title,
                url: url,
            }).catch(err => console.log('Error sharing:', err));
        } else {
            alert('Event URL: ' + url);
        }
    }

    document.getElementById('register-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const btn = document.getElementById('register-btn');
        btn.disabled = true;
        btn.textContent = 'Registering...';

        try {
            const response = await fetch('{{ route("api.event.register", ["id" => $event["id"]]) }}', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                },
                body: JSON.stringify({}),
            });

            const data = await response.json();

            if (data.success) {
                window.location.href = '{{ url("/ticket") }}/' + data.data.ticket_number;
            } else {
                showError(data.message || 'Failed to register');
                btn.disabled = false;
                btn.textContent = 'Register Now';
            }
        } catch (error) {
            showError('An error occurred. Please try again.');
            btn.disabled = false;
            btn.textContent = 'Register Now';
        }
    });

    function showError(message) {
        const errorDiv = document.getElementById('error-message');
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
</script>
@endsection
