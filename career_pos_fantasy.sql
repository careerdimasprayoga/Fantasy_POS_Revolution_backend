-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 07 Sep 2020 pada 17.18
-- Versi server: 10.1.30-MariaDB
-- Versi PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `career_pos_fantasy`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `categorys`
--

CREATE TABLE `categorys` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `categorys`
--

INSERT INTO `categorys` (`id`, `name`) VALUES
(1, 'Food'),
(2, 'Drink'),
(3, 'Ice'),
(16, 'Category Baru');

-- --------------------------------------------------------

--
-- Struktur dari tabel `historys`
--

CREATE TABLE `historys` (
  `id` int(11) NOT NULL,
  `invoice` int(10) NOT NULL,
  `subtotal` decimal(18,2) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `historys`
--

INSERT INTO `historys` (`id`, `invoice`, `subtotal`, `date`) VALUES
(10, 468865954, '147000.00', '2020-08-25 16:24:50'),
(11, 206644355, '212100.00', '2019-08-28 22:34:52'),
(12, 478236549, '1001700.00', '2020-08-26 13:48:40'),
(13, 12278075, '56000.00', '2020-08-30 17:16:22'),
(14, 12278075, '598500.00', '2020-08-28 17:16:37'),
(15, 12278075, '213150.00', '2020-08-27 17:18:47'),
(16, 12278075, '885150.00', '2020-08-29 17:18:59'),
(17, 896947176, '695100.00', '2020-09-03 22:16:38'),
(18, 896947176, '257775.00', '2020-07-31 22:16:50'),
(19, 374184668, '1270500.00', '2020-08-31 00:17:51'),
(20, 211897074, '49875.00', '2020-08-31 14:17:07'),
(21, 1234, '113900.00', '2020-09-02 21:33:29');

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_history` int(11) NOT NULL,
  `price` decimal(18,2) NOT NULL,
  `ppn` decimal(18,2) NOT NULL,
  `qty` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `id_product`, `id_history`, `price`, `ppn`, `qty`) VALUES
(12, 1, 10, '20000.00', '1000.00', 1),
(13, 9, 10, '120000.00', '6000.00', 2),
(14, 3, 11, '160000.00', '8000.00', 1),
(15, 4, 11, '42000.00', '2100.00', 2),
(16, 3, 12, '160000.00', '8000.00', 1),
(17, 8, 12, '90000.00', '4500.00', 1),
(18, 7, 12, '102000.00', '5100.00', 4),
(19, 2, 12, '602000.00', '30100.00', 7),
(20, 3, 13, '960000.00', '48000.00', 6),
(21, 9, 14, '480000.00', '24000.00', 8),
(22, 8, 14, '90000.00', '4500.00', 1),
(23, 5, 15, '17500.00', '875.00', 1),
(24, 6, 15, '164500.00', '8225.00', 7),
(25, 4, 15, '21000.00', '1050.00', 1),
(26, 5, 16, '17500.00', '875.00', 1),
(27, 6, 16, '164500.00', '8225.00', 8),
(28, 4, 16, '21000.00', '1050.00', 2),
(29, 3, 16, '640000.00', '32000.00', 4),
(30, 1, 17, '60000.00', '3000.00', 3),
(31, 2, 17, '602000.00', '30100.00', 7),
(32, 3, 18, '160000.00', '8000.00', 1),
(33, 9, 18, '60000.00', '3000.00', 1),
(34, 7, 18, '25500.00', '1275.00', 1),
(35, 10, 19, '960000.00', '48000.00', 3),
(36, 8, 19, '90000.00', '4500.00', 1),
(37, 3, 19, '160000.00', '8000.00', 1),
(38, 12, 20, '30000.00', '1500.00', 2),
(39, 5, 20, '17500.00', '875.00', 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `id_category` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `image` varchar(300) DEFAULT NULL,
  `price` decimal(18,2) NOT NULL,
  `created` datetime NOT NULL,
  `updated` datetime NOT NULL,
  `status` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `id_category`, `name`, `image`, `price`, `created`, `updated`, `status`) VALUES
(1, 1, 'Red Velvet Latte', 'red_velvet_latte.jpg', '20000.00', '2020-08-23 22:01:57', '2020-08-28 00:20:28', 1),
(2, 1, 'Cappucino', 'cappucino.jpg', '86000.00', '0000-00-00 00:00:00', '2020-08-28 00:20:47', 1),
(3, 1, 'Choco Rhum', 'choco_rum.jpg', '160000.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(4, 1, 'Black Forest', 'black_forest.jpg', '21000.00', '2020-08-25 00:00:00', '0000-00-00 00:00:00', 1),
(5, 1, 'Coffee Latte', 'cofee_latte.jpg', '17500.00', '2020-08-25 00:00:00', '0000-00-00 00:00:00', 0),
(6, 1, 'Espresso', 'espresso.png', '23500.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(7, 3, 'Wiener Schnitzel', 'wienner_schnitzel.jpg', '25500.00', '0000-00-00 00:00:00', '2020-08-28 00:25:56', 1),
(8, 1, 'Salmon Truffle Teriyaki', 'salmon_trufle.jpg', '90000.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(9, 1, 'Chicken Katsu Dabu-dabu', 'chicken_katsu_dabu-dabu.jpg', '60000.00', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 0),
(10, 1, 'Chicken Gahat', 'cappucino.jpg', '320000.00', '2020-08-29 16:28:27', '0000-00-00 00:00:00', 1),
(11, 1, 'Kebab\n', NULL, '32000.00', '2020-09-05 12:40:57', '0000-00-00 00:00:00', 0),
(12, 1, 'Kebab\n', NULL, '32000.00', '2020-09-05 12:43:24', '0000-00-00 00:00:00', 0),
(13, 1, 'Kebab\n', NULL, '32000.00', '2020-09-05 12:44:05', '0000-00-00 00:00:00', 0),
(18, 1, 'Plankton\n', 'image-2020-09-05T11-01-59.524Z-16865121_1276637722383409_5095064559517504637_n.jpg', '150000.00', '2020-09-05 18:01:59', '0000-00-00 00:00:00', 0),
(19, 1, 'Spongebob\n', 'image-2020-09-06T08-59-25.711Z-16806974_1276637762383405_2397490712416831806_n.jpg', '150000.00', '2020-09-06 15:59:26', '0000-00-00 00:00:00', 0),
(20, 1, 'Spongebob kito\n', 'image-2020-09-07T08-16-49.869Z-16806974_1276637762383405_2397490712416831806_n.jpg', '150000.00', '2020-09-07 15:16:49', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `role_id` int(1) NOT NULL COMMENT '1 cahier, 2 admin',
  `status` int(1) NOT NULL COMMENT '0 Not Active, 1 Active',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `role_id`, `status`, `created`, `updated`, `image`) VALUES
(1, 'dimas@gmail.com', '$2b$10$KqnpqNv3ru2R8AiYEg7T/uIf4O5rlTNJrUEYIxCHYd8MBk.kREAGS', 'halo dimas', 2, 1, '2020-09-06 14:08:35', '2020-09-06 14:08:35', ''),
(2, 'cashier@gmail.com', '$2b$10$4tMqyKOUc9gTGelyo4KaaeloBx0ueIsRw6vqyFAM2d29T7XwfNGKi', 'Cashier', 1, 1, '2020-09-04 06:55:45', '0000-00-00 00:00:00', ''),
(3, 'admin@gmail.com', '$2b$10$Lc.aNOFnCGthJIEW3Yt5n.gIZDAl8UUP1UGGhB2dmPFk8igoe3N6C', 'Administrator', 2, 1, '2020-09-04 06:57:48', '0000-00-00 00:00:00', ''),
(4, 'dimasprayoga@gmail.com', '$2b$10$QbgfsIKu3bCs3lhU4jTBh.zThSSvC3CqFHu5/b01/yxPZsNt6SPZq', 'Dimas prayoga', 1, 0, '2020-09-07 08:10:26', '0000-00-00 00:00:00', '');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `categorys`
--
ALTER TABLE `categorys`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `historys`
--
ALTER TABLE `historys`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `categorys`
--
ALTER TABLE `categorys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT untuk tabel `historys`
--
ALTER TABLE `historys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
