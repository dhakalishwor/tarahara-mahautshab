<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of orders (Admins see all, Users see their own).
     */
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();
        
        $query = Order::with('items', 'user');

        if ($user->role !== 'admin') {
            $query->where('user_id', $user->id);
        }

        $orders = $query->orderBy('created_at', 'desc')->get();

        return response()->json($orders);
    }

    /**
     * Store a newly created order (Checkout).
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'total_amount' => 'required|numeric|min:0',
            'delivery_address' => 'required|string|max:255',
            'phone' => 'required|string|max:255',
            'special_instructions' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.menu_item_id' => 'nullable|integer',
            'items.*.restaurant_name' => 'required|string',
            'items.*.menu_item_name' => 'required|string',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            DB::beginTransaction();

            $order = Order::create([
                'user_id' => Auth::id(),
                'total_amount' => $request->total_amount,
                'status' => 'Pending',
                'delivery_address' => $request->delivery_address,
                'phone' => $request->phone,
                'special_instructions' => $request->special_instructions,
            ]);

            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'menu_item_id' => $item['menu_item_id'] ?? null,
                    'restaurant_name' => $item['restaurant_name'],
                    'menu_item_name' => $item['menu_item_name'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message' => 'Order placed successfully',
                'order' => $order->load('items')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Failed to place order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified order.
     */
    public function show($id): JsonResponse
    {
        $order = Order::with('items', 'user')->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $user = Auth::user();
        if ($user->role !== 'admin' && $order->user_id !== $user->id) {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        return response()->json($order);
    }

    /**
     * Update the specified order status (Admin only).
     */
    public function updateStatus(Request $request, $id): JsonResponse
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Unauthorized access'], 403);
        }

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:Pending,Preparing,Out for Delivery,Delivered,Cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        $order->update(['status' => $request->status]);

        return response()->json([
            'message' => 'Order status updated successfully',
            'order' => $order->load('items', 'user')
        ]);
    }
}
