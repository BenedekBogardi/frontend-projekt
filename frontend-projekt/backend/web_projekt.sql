-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Dec 18. 18:07
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `web_projekt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `category` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `OnStock` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `products`
--

INSERT INTO `products` (`product_id`, `category`, `name`, `price`, `OnStock`) VALUES
(1, 'Electronics', 'Smartphone - Samsung Galaxy S23', 349990, 1),
(2, 'Electronics', 'Laptop - Dell XPS 15', 749990, 1),
(3, 'Electronics', 'Wireless Headphones - Sony WH-1000XM5', 129990, 1),
(4, 'Electronics', 'Smartwatch - Apple Watch Series 8', 199990, 0),
(5, 'Home Appliances', 'Vacuum Cleaner - Dyson V12 Detect Slim', 259990, 1),
(6, 'Home Appliances', 'Air Fryer - Philips XXL', 79990, 1),
(7, 'Home Appliances', 'Microwave - Samsung ME731K', 39990, 1),
(8, 'Fashion', 'T-shirt - Cotton Crewneck', 3990, 1),
(9, 'Fashion', 'Running Shoes - Nike Air Zoom Pegasus 40', 45990, 1),
(10, 'Fashion', 'Leather Jacket - Black', 119990, 0),
(11, 'Books', 'Novel - The Catcher in the Rye', 3490, 1),
(12, 'Books', 'Cookbook - Jamie Oliver 5 Ingredients', 8990, 1),
(13, 'Books', 'Self-Help - Atomic Habits by James Clear', 5990, 1),
(14, 'Toys', 'Lego Set - Star Wars Millennium Falcon', 69990, 1),
(15, 'Toys', 'Action Figure - Spider-Man', 8990, 1),
(16, 'Toys', 'Board Game - Catan', 14990, 1),
(17, 'Sports', 'Soccer Ball - Adidas Al Rihla', 14990, 1),
(18, 'Sports', 'Yoga Mat - Reebok', 9990, 1),
(19, 'Sports', 'Tennis Racket - Wilson Pro Staff 97', 69990, 0),
(20, 'Beauty', 'Perfume - Dior Sauvage (100ml)', 41990, 1),
(21, 'Beauty', 'Face Cream - La Roche-Posay Effaclar', 5990, 1),
(22, 'Beauty', 'Lipstick - MAC Ruby Woo', 8990, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('R1iKRLd8nWZ5aPZMfBH1t42ieXsnJrml', 1734539946, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2024-12-18T16:38:11.513Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"test\"}}'),
('_NkHm4t-WLzSObLCPntwg5TyfHb8ePpK', 1734540985, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2024-12-18T16:56:25.259Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"test\"}}'),
('b8_wVLiasgikmLaZxFB3BSDbD53mhDOR', 1734541235, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2024-12-18T17:00:34.845Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"test\"}}'),
('w5ZbQ8YEzTec79U-SoGY_0yOarQqjQkd', 1734541124, '{\"cookie\":{\"originalMaxAge\":60000,\"expires\":\"2024-12-18T16:58:44.136Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"username\":\"test\"}}');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `email`) VALUES
(2, 'john_doe', '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36uU9jHdWouZ.lT.BFBO9e.', 'john.doe@example.com'),
(3, 'jane_smith', '$2b$10$9qC9mBZ4RtmOZEPFXUgqVO1/jm.QfMv4x1Fr/KoOVBGsyp5dmAkFS', 'jane.smith@example.com'),
(4, 'mike_ross', '$2b$10$lkAjU7NfpG3KH8wM7LBHAutPLcAwA1Nz/NL3YEvMbKq9y8BS/UHeG', 'mike.ross@example.com'),
(5, 'alice_wonder', '$2b$10$FmsGAnxZ5tG0QmYFgJpCKeBxM0lHvn77xlZ42YszpHUbXwDeI4fxm', 'alice.wonder@example.com'),
(6, 'charlie_brown', '$2b$10$Y9HNU4xLKPRIRDXtxEG38eJNiAz6D8RLMyQHqFnkFSYRCMyZpX5Ca', 'charlie.brown@example.com'),
(8, 'test', '$2a$10$mHCyjhk8jqfuMu9P7K2VkO3i9duWeNLNuYpMtjFfJ5/93pMmXbU2y', 'test@test.com');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
