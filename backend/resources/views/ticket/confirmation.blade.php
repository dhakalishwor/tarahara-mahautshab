@extends('layouts.app')

@section('title', 'Ticket Confirmation - ' . $ticket['registration']['ticket_number'])

@section('content')
<div class="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 py-8 px-4">
    <div class="max-w-2xl mx-auto">
        <!-- Success Message -->
        <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-center">
            ✓ You have successfully registered!
        </div>

        <!-- Ticket Card -->
        <div id="ticket-card" class="bg-white rounded-lg shadow-xl overflow-hidden mb-6">
            <!-- Header -->
            <div class="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8">
                <h1 class="text-4xl font-bold mb-2">Event Ticket</h1>
                <p class="text-purple-100">Your confirmation receipt</p>
            </div>

            <!-- Event Image -->
            <div class="h-48 bg-gray-200 overflow-hidden">
                @if($ticket['event']['image_url'])
                    <img src="{{ $ticket['event']['image_url'] }}" alt="{{ $ticket['event']['name'] }}" class="w-full h-full object-cover">
                @else
                    <div class="w-full h-full bg-gradient-to-br from-purple-400 to-blue-500 flex items-center justify-center text-white text-6xl font-bold">
                        {{ substr($ticket['event']['name'], 0, 1) }}
                    </div>
                @endif
            </div>

            <!-- Event Details -->
            <div class="p-8">
                <h2 class="text-3xl font-bold text-gray-800 mb-6">{{ $ticket['event']['name'] }}</h2>

                <!-- Event Info Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pb-8 border-b">
                    <div>
                        <p class="text-sm text-gray-600 mb-1">📅 Date</p>
                        <p class="text-lg font-semibold text-gray-800">
                            {{ \Carbon\Carbon::parse($ticket['event']['date'])->format('l, F j, Y') }}
                        </p>
                    </div>
                    <div>
                        <p class="text-sm text-gray-600 mb-1">⏰ Time</p>
                        <p class="text-lg font-semibold text-gray-800">{{ $ticket['event']['time'] }}</p>
                    </div>
                    <div class="md:col-span-2">
                        <p class="text-sm text-gray-600 mb-1">📍 Location</p>
                        <p class="text-lg font-semibold text-gray-800">{{ $ticket['event']['location'] }}</p>
                    </div>
                </div>

                <!-- Description -->
                <div class="mb-8 pb-8 border-b">
                    <h3 class="text-lg font-semibold text-gray-800 mb-3">Event Description</h3>
                    <p class="text-gray-700 leading-relaxed">{{ $ticket['event']['description'] }}</p>
                </div>

                <!-- Ticket Information -->
                <div class="bg-gray-50 rounded-lg p-6 mb-8">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p class="text-sm text-gray-600 mb-2">Ticket Number</p>
                            <p class="text-2xl font-mono font-bold text-purple-600 break-all">
                                {{ $ticket['registration']['ticket_number'] }}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-600 mb-2">Registration Status</p>
                            <div class="flex items-center gap-2">
                                <span class="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                                    ✓ {{ ucfirst($ticket['registration']['status']) }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- QR Code Section -->
                <div class="flex flex-col items-center mb-8 pb-8 border-b">
                    <p class="text-sm text-gray-600 mb-4">Scan this QR code at the event</p>
                    <div class="bg-white p-4 rounded-lg shadow-md">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data={{ urlencode($ticket['registration']['ticket_number']) }}" 
                             alt="QR Code" class="w-48 h-48">
                    </div>
                </div>

                <!-- Important Notes -->
                <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
                    <p class="text-sm text-blue-800">
                        <strong>📌 Important:</strong> Please present this ticket at the event entrance. You can either show the QR code on your phone or print this ticket.
                    </p>
                </div>

                <!-- Agenda -->
                @if($ticket['event']['agenda'] && count($ticket['event']['agenda']) > 0)
                    <div class="mb-8">
                        <h3 class="text-lg font-semibold text-gray-800 mb-4">Event Agenda</h3>
                        <div class="space-y-3">
                            @foreach($ticket['event']['agenda'] as $item)
                                <div class="flex gap-4">
                                    <div class="flex-shrink-0 w-16 font-semibold text-purple-600">
                                        {{ $item['time'] ?? '' }}
                                    </div>
                                    <div class="flex-1 text-gray-700">
                                        {{ $item['activity'] ?? '' }}
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endif
            </div>

            <!-- Footer -->
            <div class="bg-gray-100 px-8 py-4 text-center text-sm text-gray-600">
                <p>Issued on {{ now()->format('l, F j, Y \a\t g:i A') }}</p>
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-3">
            <button onclick="checkIn()" class="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition" id="checkin-btn">
                ✓ Check In
            </button>

            <button onclick="downloadTicket()" class="w-full px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition">
                📥 Download Ticket (PDF)
            </button>

            <a href="{{ route('dashboard') }}" class="block px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition text-center">
                Back to Dashboard
            </a>
        </div>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
<script>
    function checkIn() {
        const btn = document.getElementById('checkin-btn');
        btn.disabled = true;
        btn.textContent = 'Checking In...';

        fetch('{{ route("api.ticket.checkin", ["ticketNumber" => $ticket["registration"]["ticket_number"]]) }}', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
            },
            body: JSON.stringify({}),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('✓ Successfully checked in!');
                location.reload();
            } else {
                alert('Error: ' + (data.message || 'Failed to check in'));
                btn.disabled = false;
                btn.textContent = '✓ Check In';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred');
            btn.disabled = false;
            btn.textContent = '✓ Check In';
        });
    }

    function downloadTicket() {
        const element = document.getElementById('ticket-card');
        const opt = {
            margin: 10,
            filename: `ticket-{{ $ticket['registration']['ticket_number'] }}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
        };
        html2pdf().set(opt).from(element).save();
    }
</script>
@endsection
