const db = require("./config/db"); 
const bcrypt = require("bcryptjs");

async function seedAdmin() {
  try {
    // Data admin default
    const adminData = {
      username: "admin",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    };

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    await db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [adminData.username, adminData.email, hashedPassword, adminData.role]
    );

    console.log("Admin default berhasil ditambahkan ke database!");
    console.log(`Username: ${adminData.username}, Email: ${adminData.email}`);
    console.log("Password: admin123 (ubah setelah login pertama kali untuk keamanan!)");
  } catch (err) {
    console.error("Error menambahkan admin:", err);
  } finally {
    // Tutup koneksi database jika diperlukan
    // db.end(); // Uncomment jika db.js menggunakan pool dan perlu ditutup
  }
}

seedAdmin();