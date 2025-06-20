import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from ".././layout/Navbar";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Registration success:", data);
        navigate("/register-success");
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleCreateOrganizerAccount = () => {
    navigate("/register-organizer");
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <main className="flex flex-col items-stretch bg-[#FCEDDA] min-h-screen">
      {/* Navbar */}
      <div className="w-full max-w-[1440px] mx-auto px-8 py-4">
        <Navbar />
      </div>

      {/* Content */}
      <div className="flex flex-1">
        <div className="flex w-full max-w-[1440px] mx-auto">
          {/* Left side - Image */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/a234bda996e47dbbe7a5cc288110383e53c6cdc7?placeholderIfAbsent=true"
              alt="Register Illustration"
              className="w-full h-auto max-w-[650px] rounded-[15px]"
            />
          </div>

          {/* Right side - Form */}
          <div className="w-1/2 flex items-center justify-center relative p-8 max-md:w-full">
            {/* Tombol X (close) */}
            <button
              onClick={handleClose}
              className="absolute top-8 right-8 text-2xl text-black"
            >
              ×
            </button>

            <div className="w-[490px] max-w-full">
              <h1 className="text-black text-center text-5xl font-bold">
                Sign Up
              </h1>

              <form onSubmit={handleSubmit} className="w-full mt-[26px]">
                <div className="text-[15px] text-black space-y-[26px]">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                    className="w-full py-[3px] border-b-[3px] border-black bg-transparent focus:outline-none"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                    className="w-full py-[3px] border-b-[3px] border-black bg-transparent focus:outline-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full py-[3px] border-b-[3px] border-black bg-transparent focus:outline-none"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full py-[3px] border-b-[3px] border-black bg-transparent focus:outline-none"
                  />
                </div>

                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                <p className="text-center text-xs text-black leading-7 mt-6">
                  By continuing you agree to our{" "}
                  <a href="#" className="underline">
                    Terms and Condition
                  </a>{" "}
                  and{" "}
                  <a href="#" className="underline">
                    Privacy Policy
                  </a>
                </p>

                <button
                  type="submit"
                  className="w-full text-black text-xl bg-[#FFDEB5] mt-4 px-2.5 py-[13px] rounded-[50px] hover:bg-[#FFD19F] transition-colors"
                >
                  SIGN IN
                </button>
              </form>

              <div className="mt-5">
                <p className="text-center text-black text-sm">
                  Or sign up with
                </p>
                <div className="flex justify-between gap-4 mt-3">
                  <button className="w-1/2 bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-90">
                    <img
                      src="/logoGoogle.png"
                      alt="Google"
                      className="w-5 h-5"
                    />
                    Google
                  </button>
                  <button className="w-1/2 bg-black text-white py-3 rounded-full flex items-center justify-center gap-2 hover:opacity-90">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      className="w-5 h-5"
                    />
                    Facebook
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 mt-6 text-base text-black">
                <span>Already Have an account</span>
                <a href="/login" className="underline">
                  Sign In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
