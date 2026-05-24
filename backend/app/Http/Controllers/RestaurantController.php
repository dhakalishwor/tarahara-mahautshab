<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RestaurantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $restaurants = Restaurant::with('owner', 'menuItems')
            ->when(request('user_id'), function ($query) {
                return $query->where('user_id', request('user_id'));
            })
            ->get();

        return response()->json($restaurants);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'cuisine' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'phone' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $restaurant = Restaurant::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'cuisine' => $request->cuisine,
            'address' => $request->address,
            'phone' => $request->phone,
            'description' => $request->description,
            'image' => $request->image,
            'is_active' => $request->is_active ?? true,
        ]);

        return response()->json([
            'message' => 'Restaurant created successfully',
            'restaurant' => $restaurant->load('owner', 'menuItems')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $restaurant = Restaurant::with('owner', 'menuItems')->find($id);

        if (!$restaurant) {
            return response()->json([
                'message' => 'Restaurant not found'
            ], 404);
        }

        return response()->json($restaurant);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json([
                'message' => 'Restaurant not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|string|max:255',
            'cuisine' => 'sometimes|string|max:255',
            'address' => 'sometimes|string|max:255',
            'phone' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $restaurant->update($request->all());

        return response()->json([
            'message' => 'Restaurant updated successfully',
            'restaurant' => $restaurant->load('owner', 'menuItems')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $restaurant = Restaurant::find($id);

        if (!$restaurant) {
            return response()->json([
                'message' => 'Restaurant not found'
            ], 404);
        }

        $restaurant->delete();

        return response()->json([
            'message' => 'Restaurant deleted successfully'
        ]);
    }
}
