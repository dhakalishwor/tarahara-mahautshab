<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Tarahara Mahautshab')</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Additional Styles -->
    @stack('styles')
</head>
<body class="bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-4">
            <div class="flex justify-between items-center">
                <a href="{{ route('home') }}" class="text-2xl font-bold text-indigo-600">
                    Tarahara Mahautshab
                </a>
                
                <div class="space-x-4">
                    @auth
                        <a href="{{ route('dashboard') }}" class="text-gray-600 hover:text-gray-900">Dashboard</a>
                        <form method="POST" action="{{ route('logout') }}" class="inline">
                            @csrf
                            <button type="submit" class="text-gray-600 hover:text-gray-900">Logout</button>
                        </form>
                    @else
                        <a href="{{ route('login') }}" class="text-gray-600 hover:text-gray-900">Login</a>
                        <a href="{{ route('register') }}" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Register</a>
                    @endauth
                </div>
            </div>
        </div>
    </nav>

    <!-- Flash Messages -->
    @if ($errors->any())
        <div class="container mx-auto px-4 mt-4">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        </div>
    @endif

    @if (session('success'))
        <div class="container mx-auto px-4 mt-4">
            <div class="bg-green-50 border border-green-200 rounded-lg p-4 text-green-700">
                {{ session('success') }}
            </div>
        </div>
    @endif

    @if (session('error'))
        <div class="container mx-auto px-4 mt-4">
            <div class="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {{ session('error') }}
            </div>
        </div>
    @endif

    <!-- Main Content -->
    <main>
        @yield('content')
    </main>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white mt-12 py-8">
        <div class="container mx-auto px-4 text-center">
            <p>&copy; {{ date('Y') }} Tarahara Mahautshab. All rights reserved.</p>
        </div>
    </footer>

    <!-- Scripts -->
    @stack('scripts')
</body>
</html>
