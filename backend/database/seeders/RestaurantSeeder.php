<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Restaurant;
use App\Models\MenuItem;

class RestaurantSeeder extends Seeder
{
    public function run(): void
    {
        $restaurants = [
            [
                'name' => 'Pizza Palace',
                'cuisine' => 'Italian • Pizza',
                'address' => 'Tarahara, Sunsari',
                'phone' => '025-123456',
                'description' => 'Authentic Italian pizzas baked fresh in our wood-fired oven.',
                'image' => 'https://images.unsplash.com/photo-1604381536136-57f992014df5?auto=format&fit=crop&w=600&q=80',
                'is_active' => true,
                'menu' => [
                    ['name' => 'Margherita Pizza', 'price' => 550, 'category' => 'Pizza', 'description' => 'Classic tomato and mozzarella', 'image' => 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Pepperoni Pizza', 'price' => 650, 'category' => 'Pizza', 'description' => 'Classic pepperoni, mozzarella, rich tomato sauce', 'image' => 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Vegetable Supreme', 'price' => 600, 'category' => 'Pizza', 'description' => 'Bell peppers, onions, mushrooms, olives', 'image' => 'https://images.unsplash.com/photo-1576458088443-04a19bb13da6?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'BBQ Chicken Pizza', 'price' => 750, 'category' => 'Pizza', 'description' => 'Smoky BBQ sauce, grilled chicken, red onions', 'image' => 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Garlic Bread with Cheese', 'price' => 250, 'category' => 'Sides', 'description' => 'Oven-baked garlic bread with melted mozzarella', 'image' => 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=300&q=80'],
                ],
            ],
            [
                'name' => 'Sushi World',
                'cuisine' => 'Japanese • Sushi',
                'address' => 'Itahari, Sunsari',
                'phone' => '025-234567',
                'description' => 'Premium sushi and Japanese cuisine made with the freshest ingredients.',
                'image' => 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',
                'is_active' => true,
                'menu' => [
                    ['name' => 'California Roll', 'price' => 650, 'category' => 'Sushi', 'description' => 'Crab meat, avocado, cucumber', 'image' => 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Salmon Nigiri (4pcs)', 'price' => 850, 'category' => 'Sushi', 'description' => 'Premium fresh salmon slices over rice', 'image' => 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Spicy Tuna Roll', 'price' => 750, 'category' => 'Sushi', 'description' => 'Fresh tuna mixed with spicy mayo', 'image' => 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Dragon Roll', 'price' => 1200, 'category' => 'Sushi', 'description' => 'Eel, cucumber, avocado and eel sauce', 'image' => 'https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Miso Soup', 'price' => 200, 'category' => 'Soup', 'description' => 'Traditional Japanese soup with tofu and seaweed', 'image' => 'https://images.unsplash.com/photo-1584014902167-96a1a1f33ee6?auto=format&fit=crop&w=300&q=80'],
                ],
            ],
            [
                'name' => 'Burger Hub',
                'cuisine' => 'American • Fast Food',
                'address' => 'Biratnagar, Morang',
                'phone' => '021-345678',
                'description' => 'Juicy hand-smashed burgers and loaded fries.',
                'image' => 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
                'is_active' => true,
                'menu' => [
                    ['name' => 'Classic Smash Burger', 'price' => 350, 'category' => 'Burger', 'description' => 'Smashed beef patty, lettuce, tomato, pickles', 'image' => 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Double Bacon Cheeseburger', 'price' => 500, 'category' => 'Burger', 'description' => 'Two beef patties, double cheddar, crispy bacon', 'image' => 'https://images.unsplash.com/photo-1594212691516-749e75924dd1?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Crispy Chicken Sandwich', 'price' => 380, 'category' => 'Sandwich', 'description' => 'Buttermilk fried chicken, spicy mayo, pickles', 'image' => 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Loaded Fries', 'price' => 250, 'category' => 'Sides', 'description' => 'Crispy fries with cheese sauce and bacon bits', 'image' => 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Oreo Milkshake', 'price' => 280, 'category' => 'Drinks', 'description' => 'Thick hand-spun milkshake with crushed Oreo', 'image' => 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80'],
                ],
            ],
            [
                'name' => 'Dragon Wok',
                'cuisine' => 'Chinese • Noodles',
                'address' => 'Dharan, Sunsari',
                'phone' => '025-456789',
                'description' => 'Authentic Chinese wok dishes cooked to perfection.',
                'image' => 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',
                'is_active' => true,
                'menu' => [
                    ['name' => 'Kung Pao Chicken', 'price' => 450, 'category' => 'Main', 'description' => 'Spicy diced chicken with peanuts and chili peppers', 'image' => 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Beef Chow Mein', 'price' => 400, 'category' => 'Noodles', 'description' => 'Stir-fried egg noodles with tender beef', 'image' => 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Sweet and Sour Pork', 'price' => 480, 'category' => 'Main', 'description' => 'Crispy pork in tangy sweet and sour sauce', 'image' => 'https://images.unsplash.com/photo-1520689686008-01d84f932e63?auto=format&fit=crop&w=300&q=80'],
                ],
            ],
            [
                'name' => 'Spice Route',
                'cuisine' => 'Indian • Curry',
                'address' => 'Inaruwa, Sunsari',
                'phone' => '025-567890',
                'description' => 'Rich, aromatic Indian curries and tandoori specials.',
                'image' => 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',
                'is_active' => true,
                'menu' => [
                    ['name' => 'Butter Chicken', 'price' => 500, 'category' => 'Curry', 'description' => 'Tender chicken in creamy tomato-butter gravy', 'image' => 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Paneer Tikka Masala', 'price' => 450, 'category' => 'Curry', 'description' => 'Grilled paneer cubes in spiced tomato sauce', 'image' => 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Garlic Naan', 'price' => 120, 'category' => 'Bread', 'description' => 'Soft bread baked with garlic and butter', 'image' => 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Biryani', 'price' => 550, 'category' => 'Rice', 'description' => 'Fragrant basmati rice with spices and tender meat', 'image' => 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80'],
                ],
            ],
            [
                'name' => 'Sweet Dreams',
                'cuisine' => 'Desserts • Bakery',
                'address' => 'Tarahara, Sunsari',
                'phone' => '025-678901',
                'description' => 'Handcrafted desserts, cakes, and freshly baked pastries.',
                'image' => 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',
                'is_active' => true,
                'menu' => [
                    ['name' => 'Chocolate Lava Cake', 'price' => 350, 'category' => 'Cake', 'description' => 'Warm chocolate cake with molten center', 'image' => 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Tiramisu', 'price' => 400, 'category' => 'Dessert', 'description' => 'Classic Italian coffee-flavored dessert', 'image' => 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80'],
                    ['name' => 'Fresh Fruit Tart', 'price' => 320, 'category' => 'Pastry', 'description' => 'Buttery tart crust with pastry cream and seasonal fruits', 'image' => 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=300&q=80'],
                ],
            ],
        ];

        foreach ($restaurants as $restaurantData) {
            $menuData = $restaurantData['menu'];
            unset($restaurantData['menu']);

            $restaurant = Restaurant::create($restaurantData);

            foreach ($menuData as $item) {
                $restaurant->menuItems()->create(array_merge($item, ['is_available' => true]));
            }
        }
    }
}
