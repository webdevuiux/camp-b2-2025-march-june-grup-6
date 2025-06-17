import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Login_Admin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login gagal");
      }

      const userData = {
        id: data.admin.id || null,
        username: data.admin.username || formData.username,
        role: data.admin.role || "admin",
        email: data.admin.email || null,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      localStorage.setItem("token", data.token || ""); // Simpan token jika ada

      navigate("/admin");
    } catch (err) {
      setError(err.message || "Kredensial tidak valid");
    } finally {
      setLoading(false);
    }
  };

  return (
<main className="flex flex-col min-h-screen bg-[#FCEDDA]">
  <div className="container mx-auto px-4 py-16">
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
      {/* Logo */}
      <div className="text-center mb-8">
        <img
          src="/logohero.svg"
          alt="Tiket Karya Logo"
          className="mx-auto w-60 h-auto"
        />
      </div>
          <h1 className="text-2xl font-bold text-center mb-8">Admin Login</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF5126] focus:ring-1 focus:ring-[#FF5126] transition-colors"
                required
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#FF5126] focus:ring-1 focus:ring-[#FF5126] transition-colors"
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-[#FF5126] text-white text-xl font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-colors ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-[#FF5126] hover:text-opacity-80 transition-colors"
            >
              Back to Homepage
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login_Admin;
