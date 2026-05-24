-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: tarahara_mahautshab
-- ------------------------------------------------------
-- Server version	10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_items`
--

DROP TABLE IF EXISTS `menu_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `menu_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `restaurant_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(8,2) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `menu_items_restaurant_id_foreign` (`restaurant_id`),
  CONSTRAINT `menu_items_restaurant_id_foreign` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_items`
--

LOCK TABLES `menu_items` WRITE;
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
INSERT INTO `menu_items` VALUES (1,1,'Margherita Pizza','Classic tomato and mozzarella',12.99,'Pizza',NULL,1,'2026-01-11 09:10:29','2026-01-11 09:10:29'),(2,2,'Margherita Pizza','Classic tomato and mozzarella',550.00,'Pizza','https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(3,2,'Pepperoni Pizza','Classic pepperoni, mozzarella, rich tomato sauce',650.00,'Pizza','https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(4,2,'Vegetable Supreme','Bell peppers, onions, mushrooms, olives',600.00,'Pizza','https://images.unsplash.com/photo-1576458088443-04a19bb13da6?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(5,2,'BBQ Chicken Pizza','Smoky BBQ sauce, grilled chicken, red onions',750.00,'Pizza','https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(6,2,'Garlic Bread with Cheese','Oven-baked garlic bread with melted mozzarella',250.00,'Sides','https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(7,3,'California Roll','Crab meat, avocado, cucumber',650.00,'Sushi','https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(8,3,'Salmon Nigiri (4pcs)','Premium fresh salmon slices over rice',850.00,'Sushi','https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(9,3,'Spicy Tuna Roll','Fresh tuna mixed with spicy mayo',750.00,'Sushi','https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(10,3,'Dragon Roll','Eel, cucumber, avocado and eel sauce',1200.00,'Sushi','https://images.unsplash.com/photo-1615361200141-f45040f367be?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(11,3,'Miso Soup','Traditional Japanese soup with tofu and seaweed',200.00,'Soup','https://images.unsplash.com/photo-1584014902167-96a1a1f33ee6?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(12,4,'Classic Smash Burger','Smashed beef patty, lettuce, tomato, pickles',350.00,'Burger','https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(13,4,'Double Bacon Cheeseburger','Two beef patties, double cheddar, crispy bacon',500.00,'Burger','https://images.unsplash.com/photo-1594212691516-749e75924dd1?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(14,4,'Crispy Chicken Sandwich','Buttermilk fried chicken, spicy mayo, pickles',380.00,'Sandwich','https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(15,4,'Loaded Fries','Crispy fries with cheese sauce and bacon bits',250.00,'Sides','https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(16,4,'Oreo Milkshake','Thick hand-spun milkshake with crushed Oreo',280.00,'Drinks','https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(17,5,'Kung Pao Chicken','Spicy diced chicken with peanuts and chili peppers',450.00,'Main','https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(18,5,'Beef Chow Mein','Stir-fried egg noodles with tender beef',400.00,'Noodles','https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(19,5,'Sweet and Sour Pork','Crispy pork in tangy sweet and sour sauce',480.00,'Main','https://images.unsplash.com/photo-1520689686008-01d84f932e63?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(20,6,'Butter Chicken','Tender chicken in creamy tomato-butter gravy',500.00,'Curry','https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(21,6,'Paneer Tikka Masala','Grilled paneer cubes in spiced tomato sauce',450.00,'Curry','https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(22,6,'Garlic Naan','Soft bread baked with garlic and butter',120.00,'Bread','https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(23,6,'Biryani','Fragrant basmati rice with spices and tender meat',550.00,'Rice','https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(24,7,'Chocolate Lava Cake','Warm chocolate cake with molten center',350.00,'Cake','https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(25,7,'Tiramisu','Classic Italian coffee-flavored dessert',400.00,'Dessert','https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(26,7,'Fresh Fruit Tart','Buttery tart crust with pastry cream and seasonal fruits',320.00,'Pastry','https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=300&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(27,8,'qq','ss',1000.00,'hh',NULL,1,'2026-05-17 23:26:49','2026-05-17 23:26:49');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2019_08_19_000000_create_failed_jobs_table',1),(4,'2019_12_14_000001_create_personal_access_tokens_table',1),(5,'2025_09_26_042522_create_restaurants_table',2),(6,'2026_01_10_155708_add_role_to_users_table',3),(7,'2026_01_10_160037_add_columns_to_restaurants_table',4),(8,'2025_06_18_000000_create_users_table',1),(9,'2025_06_18_100000_create_password_resets_table',1),(10,'2025_06_19_000000_create_failed_jobs_table',1),(11,'2025_06_26_042522_create_restaurants_table',2),(12,'2025_06_26_155708_add_role_to_users_table',3),(13,'2025_06_25_160037_add_columns_to_restaurants_table',4),(14,'2025_07_10_144226_create_menu_items_table',5),(15,'2025_07_11_144737_add_owner_to_restaurants_table',5),(16,'2025_06_18_000000_create_orders_table',6),(17,'2025_06_18_000001_create_order_items_table',6);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_items` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint(20) unsigned NOT NULL,
  `menu_item_id` bigint(20) unsigned DEFAULT NULL,
  `restaurant_name` varchar(255) NOT NULL,
  `menu_item_name` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_menu_item_id_foreign` (`menu_item_id`),
  CONSTRAINT `order_items_menu_item_id_foreign` FOREIGN KEY (`menu_item_id`) REFERENCES `menu_items` (`id`) ON DELETE SET NULL,
  CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,NULL,'Pizza Palace','Pepperoni Pizza',1,650.00,'2026-05-17 23:10:26','2026-05-17 23:10:26'),(2,2,NULL,'Dhakal ishwor','qq',1,1000.00,'2026-05-17 23:27:21','2026-05-17 23:27:21');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `delivery_address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `special_instructions` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,700.00,'Preparing','ah','8765434567','yu','2026-05-17 23:10:26','2026-05-17 23:28:07'),(2,2,1050.00,'Delivered','qq','987654345678','vy','2026-05-17 23:27:21','2026-05-17 23:27:36');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES (1,'App\\Models\\User',1,'auth_token','4dc9dbaf71dcb6102806d5cf9ea91e72e2941ac6ce6718e9e81d3a1bd3e44971','[\"*\"]',NULL,NULL,'2026-01-10 10:17:46','2026-01-10 10:17:46'),(3,'App\\Models\\User',1,'auth_token','e7ffb62cffe262dc40b9f48663494b91ff30ad63e9d3b2c21b45894d983b61e1','[\"*\"]','2026-01-11 09:10:29',NULL,'2026-01-11 09:10:07','2026-01-11 09:10:29'),(31,'App\\Models\\User',4,'auth_token','966855d55fa4e26b776f959bdddd28ac26eb5fc44fa9bd15b1b2485015e9b2c8','[\"*\"]','2026-05-22 22:38:05',NULL,'2026-05-22 22:37:35','2026-05-22 22:38:05');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurants`
--

DROP TABLE IF EXISTS `restaurants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurants` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `cuisine` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `restaurants_user_id_foreign` (`user_id`),
  CONSTRAINT `restaurants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurants`
--

LOCK TABLES `restaurants` WRITE;
/*!40000 ALTER TABLE `restaurants` DISABLE KEYS */;
INSERT INTO `restaurants` VALUES (1,1,'Pizza Palace','Italian','123 Main St','555-1234','Best pizza in town','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSVgMI9Nie4HoZY0kp9yKdDbRsxNci8NF6dQ&s',1,'2026-01-11 09:10:18','2026-01-11 09:10:18'),(2,NULL,'Pizza Palace','Italian • Pizza','Tarahara, Sunsari','025-123456','Authentic Italian pizzas baked fresh in our wood-fired oven.','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ4mhUcFDGdI7jHZKJRQkDtvzCJk9VXunzkw&s',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(3,NULL,'Sushi World','Japanese • Sushi','Itahari, Sunsari','025-234567','Premium sushi and Japanese cuisine made with the freshest ingredients.','https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=600&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(4,NULL,'Burger Hub','American • Fast Food','Biratnagar, Morang','021-345678','Juicy hand-smashed burgers and loaded fries.','https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(5,NULL,'Dragon Wok','Chinese • Noodles','Dharan, Sunsari','025-456789','Authentic Chinese wok dishes cooked to perfection.','https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(6,NULL,'Spice Route','Indian • Curry','Inaruwa, Sunsari','025-567890','Rich, aromatic Indian curries and tandoori specials.','https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=600&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(7,NULL,'Sweet Dreams','Desserts • Bakery','Tarahara, Sunsari','025-678901','Handcrafted desserts, cakes, and freshly baked pastries.','https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80',1,'2026-05-17 23:17:52','2026-05-17 23:17:52'),(8,3,'Dhakal ishwor','sss','SH10','9776673437',NULL,NULL,1,'2026-05-17 23:26:26','2026-05-17 23:26:26');
/*!40000 ALTER TABLE `restaurants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('customer','restaurant_owner','delivery_person','admin') NOT NULL DEFAULT 'customer',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Test User','test@example.com','customer',NULL,'$2y$10$ry1BIJgysAOI/duZfPBcLuYjtuQyWZ2yhArgURPQuUb/.I9m4sJbO',NULL,'2026-01-10 10:17:46','2026-01-10 10:17:46'),(2,'ishwor Dhakal','dhakal.ishwor679@gmail.com','customer',NULL,'$2y$10$1tttkU1Af92mKiAt6hunYOYm9zDB7FPXC9EVpaWQYL59ZDaVY8PWC',NULL,'2026-05-17 22:16:49','2026-05-17 22:16:49'),(3,'Admin User','admin@food.com','admin',NULL,'$2y$10$COavlxM0qiDIS04rgrPt0eG7LwDmm8jBV2DrquLpLZF7PwOq45xkK',NULL,'2026-05-17 22:32:29','2026-05-17 22:32:29'),(4,'Dhakal ishwor','dhakalishwor@gmail.com','customer',NULL,'$2y$10$jAqDIUYnnEItojX55RiUCu3cHPNz3yYw8SdiYN4bVlmbT2BwKUxo.',NULL,'2026-05-17 23:33:26','2026-05-17 23:33:26');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-23 10:33:22
