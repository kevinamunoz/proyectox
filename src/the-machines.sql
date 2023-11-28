-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-10-2023 a las 05:59:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `the-machines`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ambiente`
--

CREATE TABLE `ambiente` (
  `id_ambiente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ambiente`
--

INSERT INTO `ambiente` (`id_ambiente`, `nombre`) VALUES
(1, 'TOSTADORA DE CAFE'),
(3, 'aroz');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `area`
--

CREATE TABLE `area` (
  `id_area` int(11) NOT NULL,
  `nombre` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `area`
--

INSERT INTO `area` (`id_area`, `nombre`) VALUES
(1, 'ESCUELA NACIONAL DEL CAFE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento`
--

CREATE TABLE `mantenimiento` (
  `id_mantenimiento` int(11) NOT NULL,
  `fecha_mantenimiento` date NOT NULL,
  `hora_mantenimiento` time DEFAULT NULL,
  `descripcion` varchar(300) NOT NULL,
  `tipo_mantenimiento` enum('preventivo','correctivo') NOT NULL,
  `id_maquina` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mantenimiento`
--

INSERT INTO `mantenimiento` (`id_mantenimiento`, `fecha_mantenimiento`, `hora_mantenimiento`, `descripcion`, `tipo_mantenimiento`, `id_maquina`, `id_usuario`) VALUES
(2, '2023-10-20', '15:30:00', 'Mantenimiento preventivo realizado en la máquina', 'preventivo', 2, 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maquina`
--

CREATE TABLE `maquina` (
  `id_maquina` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `placa` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `manual` varchar(300) NOT NULL,
  `serial` varchar(50) NOT NULL,
  `imagen` varchar(50) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `estado` enum('activo','inactivo','reparacion') DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `id_area` int(11) DEFAULT NULL,
  `id_ambiente` int(11) DEFAULT NULL,
  `estado_maquina` enum('activo','inactivo','baja') NOT NULL DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `maquina`
--

INSERT INTO `maquina` (`id_maquina`, `nombre`, `marca`, `placa`, `modelo`, `cantidad`, `manual`, `serial`, `imagen`, `descripcion`, `estado`, `id_usuario`, `id_area`, `id_ambiente`, `estado_maquina`) VALUES
(2, 'lava', 'yamaha', '123124', '2015', 1, 'este manual es requerido', '12321213', 'a.png', 'arrozdsf', 'activo', 4, 1, 1, 'baja'),
(3, 'lavadoradfd', 'yamaha', '123124', '2015', 1, 'este manual es requerido', '12321213', 'a.png', 'arrozdsf', 'activo', 4, 1, 1, 'activo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion_mantenimiento`
--

CREATE TABLE `notificacion_mantenimiento` (
  `id_notificacion` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `estado` enum('aceptar','omitir') NOT NULL,
  `comentarios` varchar(100) NOT NULL,
  `tipo_manteniento` enum('preventivo','correctivo') NOT NULL,
  `id_maquina` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `identificacion` int(11) NOT NULL,
  `nombres` varchar(50) NOT NULL,
  `apellidos` varchar(40) DEFAULT NULL,
  `telefono` varchar(50) NOT NULL,
  `correo` varchar(50) NOT NULL,
  `estado` enum('activo','inactivo') NOT NULL,
  `contraseña` varchar(50) NOT NULL,
  `rol` enum('administrador','tecnico','usuario') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `identificacion`, `nombres`, `apellidos`, `telefono`, `correo`, `estado`, `contraseña`, `rol`) VALUES
(3, 1006006076, 'Brayan Stiven', 'Cortes Castro', '3115068433', 'brayanstivencortes22@gmail.com', 'activo', '1006006076', 'administrador'),
(4, 12200445, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '12200445', 'administrador'),
(5, 12200445, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '12200445', 'administrador'),
(6, 1222323, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '1222323', 'administrador'),
(7, 1222323, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '1222323', 'administrador'),
(8, 1222323, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '1222323', 'administrador'),
(9, 1222323, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '1222323', 'administrador'),
(10, 1222323, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '1222323', 'administrador'),
(11, 1222323, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '1222323', 'administrador'),
(12, 13242323, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '13242323', 'administrador'),
(13, 13242323, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '13242323', 'administrador'),
(14, 34, 'Jose Israel', 'Cortes Lugo', '3115068434', 'cortes22@gmail.com', '', '34', 'administrador'),
(15, 12412, 'nombres', 'aspsdfasfrilla', '31321', 'sadsad', 'activo', '12412', 'administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ambiente`
--
ALTER TABLE `ambiente`
  ADD PRIMARY KEY (`id_ambiente`);

--
-- Indices de la tabla `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`id_area`);

--
-- Indices de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD PRIMARY KEY (`id_mantenimiento`),
  ADD KEY `fk_usuario` (`id_usuario`),
  ADD KEY `fk_maquina` (`id_maquina`);

--
-- Indices de la tabla `maquina`
--
ALTER TABLE `maquina`
  ADD PRIMARY KEY (`id_maquina`),
  ADD KEY `fk_usuario_maquina` (`id_usuario`),
  ADD KEY `fk_ambientes` (`id_ambiente`),
  ADD KEY `arealinea` (`id_area`);

--
-- Indices de la tabla `notificacion_mantenimiento`
--
ALTER TABLE `notificacion_mantenimiento`
  ADD PRIMARY KEY (`id_notificacion`),
  ADD KEY `lineanotificacion` (`id_maquina`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ambiente`
--
ALTER TABLE `ambiente`
  MODIFY `id_ambiente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `area`
--
ALTER TABLE `area`
  MODIFY `id_area` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  MODIFY `id_mantenimiento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `maquina`
--
ALTER TABLE `maquina`
  MODIFY `id_maquina` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `notificacion_mantenimiento`
--
ALTER TABLE `notificacion_mantenimiento`
  MODIFY `id_notificacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD CONSTRAINT `fk_maquina` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id_maquina`),
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `maquina`
--
ALTER TABLE `maquina`
  ADD CONSTRAINT `arealinea` FOREIGN KEY (`id_area`) REFERENCES `area` (`id_area`),
  ADD CONSTRAINT `fk_ambientes` FOREIGN KEY (`id_ambiente`) REFERENCES `ambiente` (`id_ambiente`),
  ADD CONSTRAINT `fk_usuario_maquina` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `notificacion_mantenimiento`
--
ALTER TABLE `notificacion_mantenimiento`
  ADD CONSTRAINT `lineanotificacion` FOREIGN KEY (`id_maquina`) REFERENCES `maquina` (`id_maquina`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
