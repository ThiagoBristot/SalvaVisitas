-- MariaDB dump 10.19-11.3.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: salvavisitas
-- ------------------------------------------------------
-- Server version	11.3.2-MariaDB

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
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cliente` (
  `ClienteID` int(11) NOT NULL AUTO_INCREMENT,
  `ClienteNome` varchar(60) DEFAULT NULL,
  `Endereco` varchar(60) DEFAULT NULL,
  `ClienteDescricao` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`ClienteID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES
(1,'João TESTE','Rua A, 123','Cliente regular'),
(4,'Ana TESTE','Praça D, 101','Cliente potencial'),
(5,'Carlos TESTE','Rua E, 202','Cliente fiel'),
(6,'Beatriz TESTE','Avenida F, 303','Cliente ocasional'),
(7,'Rafael TESTE','Travessa G, 404','Cliente premium'),
(8,'Fernanda TESTE','Praça H, 505','Cliente com desconto'),
(11,'THIAGO NOVO','RUA THIAGO, 763','LARA LINDA');
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estoqueitens`
--

DROP TABLE IF EXISTS `estoqueitens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estoqueitens` (
  `ItemID` int(11) NOT NULL AUTO_INCREMENT,
  `ItemNome` varchar(100) NOT NULL,
  `ItemDescricao` varchar(150) DEFAULT NULL,
  `ItemQuantidade` int(11) NOT NULL,
  `ItemPrecoU` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ItemID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estoqueitens`
--

LOCK TABLES `estoqueitens` WRITE;
/*!40000 ALTER TABLE `estoqueitens` DISABLE KEYS */;
INSERT INTO `estoqueitens` VALUES
(1,'teste','1',1,10.00),
(2,'Teste2','teste2',2,20.00),
(3,'Teste','Text9',30,1.00);
/*!40000 ALTER TABLE `estoqueitens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visita`
--

DROP TABLE IF EXISTS `visita`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `visita` (
  `VisitaSequencia` int(11) NOT NULL AUTO_INCREMENT,
  `VisitaCliente` int(11) DEFAULT NULL,
  `VisitaNome` varchar(60) DEFAULT NULL,
  `VisitaEndereco` varchar(60) DEFAULT NULL,
  `VisitaDescricao` varchar(250) DEFAULT NULL,
  `VisitaPreco` float DEFAULT NULL,
  `VisitaData` date DEFAULT NULL,
  PRIMARY KEY (`VisitaSequencia`),
  KEY `VisitaCliente` (`VisitaCliente`),
  CONSTRAINT `visita_ibfk_1` FOREIGN KEY (`VisitaCliente`) REFERENCES `cliente` (`ClienteID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visita`
--

LOCK TABLES `visita` WRITE;
/*!40000 ALTER TABLE `visita` DISABLE KEYS */;
INSERT INTO `visita` VALUES
(1,1,'Cliente Teste 1','Endereço Teste 1','Descrição da visita 1',150,'2024-08-01'),
(2,NULL,'Cliente Teste 2','Endereço Teste 2','Descrição da visita 2',200,'2024-08-02'),
(3,NULL,'Cliente Teste 3','Endereço Teste 3','Descrição 3',250,'2024-08-03'),
(4,4,'Cliente Teste 4','Endereço Teste 4','Descrição da visita 4',175,'2024-08-04'),
(5,5,'Cliente Teste 5','Endereço Teste 5','Descrição da visita 5',300,'2024-08-05'),
(6,6,'Cliente Teste 6','Endereço Teste 6','Descrição da visita 6',125,'2024-08-06'),
(7,7,'Cliente Teste 7','Endereço Teste 7','Descrição da visita 7',275,'2024-08-07'),
(9,NULL,'Cliente Teste 9','Endereço Teste 9','Descrição da visita 9',220,'2024-08-09'),
(10,NULL,'Cliente Teste 10','Endereço Teste 10','Descrição da visita 10',260,'2024-08-10'),
(11,1,'João TESTE','Rua A, 123','Computador com lentidao, foi formatado',150,'2024-08-21'),
(12,8,'Fernanda TESTE','Praça H, 505','teste',1,'2024-08-21'),
(13,7,'Rafael TESTE','Travessa G, 404','otcykcyccctcc',12,'2024-08-22');
/*!40000 ALTER TABLE `visita` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-23 15:59:14
