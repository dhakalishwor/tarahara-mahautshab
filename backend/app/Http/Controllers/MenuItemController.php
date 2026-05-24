<?php

namespace App\Http\Controllers;

use App\Models\MenuItem;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class MenuItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $menuItems = MenuItem::with('restaurant')
            ->when(request('restaurant_id'), function ($query) {
                return $query->where('restaurant_id', request('restaurant_id'));
            })
            ->get();

        return response()->json($menuItems);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'restaurant_id' => 'required|exists:restaurants,id',
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $menuItem = MenuItem::create($request->all());

        return response()->json([
            'message' => 'Menu item created successfully',
            'menu_item' => $menuItem->load('restaurant')
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        $menuItem = MenuItem::with('restaurant')->find($id);

        if (!$menuItem) {
            return response()->json([
                'message' => 'Menu item not found'
            ], 404);
        }

        return response()->json($menuItem);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id): JsonResponse
    {
        $menuItem = MenuItem::find($id);

        if (!$menuItem) {
            return response()->json([
                'message' => 'Menu item not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'restaurant_id' => 'sometimes|exists:restaurants,id',
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|numeric|min:0',
            'category' => 'nullable|string|max:255',
            'image' => 'nullable|string',
            'is_available' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $menuItem->update($request->all());

        return response()->json([
            'message' => 'Menu item updated successfully',
            'menu_item' => $menuItem->load('restaurant')
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $menuItem = MenuItem::find($id);

        if (!$menuItem) {
            return response()->json([
                'message' => 'Menu item not found'
            ], 404);
        }

        $menuItem->delete();

        return response()->json([
            'message' => 'Menu item deleted successfully'
        ]);
    }
}
