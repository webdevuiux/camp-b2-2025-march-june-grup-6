-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS tiketkarya_db;
USE tiketkarya_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE, -- Can be used for login or display name
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50), -- Optional
  email VARCHAR(100) NOT NULL UNIQUE,
  phone_number VARCHAR(20), -- Added for organizer registration
  password VARCHAR(255) NOT NULL, -- This will store the hashed password
  role ENUM('user', 'admin', 'organizer') DEFAULT 'user', -- Added 'organizer' role
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Workshop Categories
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Workshops
CREATE TABLE IF NOT EXISTS workshops (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category_id INT,
  instructor_id INT, -- This is the user_id for the organizer
  price DECIMAL(10,2) NOT NULL,
  location VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  max_participants INT NOT NULL,
  current_participants INT DEFAULT 0,
  image_url VARCHAR(255),
  status ENUM('upcoming', 'ongoing', 'completed', 'cancelled') DEFAULT 'upcoming',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (instructor_id) REFERENCES users(id)
);

-- Workshop Submissions (NEW TABLE for admin approval)
CREATE TABLE IF NOT EXISTS workshop_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  workshop_id INT NOT NULL,
  submitter_user_id INT NOT NULL, -- The organizer who submitted it
  submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  admin_notes TEXT,
  processed_by_admin_id INT, -- Admin who processed this
  processed_date TIMESTAMP NULL,
  FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE,
  FOREIGN KEY (submitter_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (processed_by_admin_id) REFERENCES users(id) ON DELETE SET NULL -- Assuming admin_id is user_id with role='admin'
);


-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  workshop_id INT,
  booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  payment_status ENUM('pending', 'paid', 'refunded') DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (workshop_id) REFERENCES workshops(id)
);

-- Refund Requests (NEW TABLE)
CREATE TABLE IF NOT EXISTS refund_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL, -- Refers to the booking/order
  user_id INT NOT NULL, -- User requesting refund
  request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  reason TEXT NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  processed_by_admin_id INT, -- Admin who processed the request
  processed_date TIMESTAMP NULL,
  admin_notes TEXT,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (processed_by_admin_id) REFERENCES users(id) ON DELETE SET NULL -- Assuming admin_id is user_id with role='admin'
);

-- Reviews (Update table)
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  workshop_id INT NOT NULL,
  user_id INT NOT NULL,
  review_title VARCHAR(255) NOT NULL,
  review_description TEXT,
  media_url VARCHAR(255), -- Untuk menyimpan URL foto/video
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (workshop_id) REFERENCES workshops(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Forum Topics
CREATE TABLE IF NOT EXISTS forum_topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Forum Comments
CREATE TABLE IF NOT EXISTS forum_comments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic_id INT,
  user_id INT,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES forum_topics(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Creative Articles (NEW TABLE)
CREATE TABLE IF NOT EXISTS creative_articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content LONGTEXT NOT NULL,
  author_user_id INT NOT NULL,
  category_id INT, -- Can link to general categories table or specific article categories
  publish_date TIMESTAMP NULL, -- NULL if draft
  status ENUM('draft', 'published', 'archived') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (author_user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- TABEL BARU UNTUK RESET PASWORD
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- TABEL BARU UNTUK MENTIMPAN PEMBAYARAN
CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  account_number VARCHAR(20) NOT NULL, -- Nomor rekening yang ditampilkan
  payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending', 'confirmed', 'rejected') DEFAULT 'pending',
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- TABEL UNTUK MENYIMPAN CUSTOMER SERVICE
CREATE TABLE IF NOT EXISTS customer_support_tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    problem_title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    attachment_path VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'in_progress', 'resolved') DEFAULT 'pending',
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- TABEL UNTUK MENYIMPAN NOTIFIKASI
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(50) NOT NULL, -- e.g., 'forum_reply', 'workshop_reminder', 'purchase_confirmation'
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_seen BOOLEAN DEFAULT FALSE,
  related_id INT, -- ID terkait (e.g., topic_id, workshop_id)
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);