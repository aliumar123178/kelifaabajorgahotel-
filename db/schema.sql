-- MySQL schema SQL file
CREATE DATABASE IF NOT EXISTS kelifa_hotel;
USE kelifa_hotel;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  email VARCHAR(100),
  phone VARCHAR(20),
  country VARCHAR(100),
  region VARCHAR(100),
  kebele VARCHAR(100),
  password VARCHAR(100)
);

CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  roomId VARCHAR(10),
  photo VARCHAR(255),
  idFront VARCHAR(255),
  idBack VARCHAR(255),
  receipt VARCHAR(255),
  travelFrom VARCHAR(100),
  travelTo VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  password VARCHAR(100)
);
