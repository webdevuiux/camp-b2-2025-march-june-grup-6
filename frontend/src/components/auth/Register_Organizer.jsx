import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register_Organizer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    category: "", // Ini tidak akan disimpan ke DB dengan setup backend saat ini
    document: null, // Ini tidak akan disimpan ke DB dengan setup backend saat ini
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(""); // State baru untuk pesan error

  const categories = [
    "Event Management",
    "Conference Organizer",
    "Wedding Planner",
    "Corporate Event Organizer",
    "Festival Organizer",
    "Exhibition Organizer",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Bersihkan error saat input berubah
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        document: e.target.files[0],
      }));
    }
  };

  const handleSubmit = async (e) => { // <-- Ubah menjadi async function
    e.preventDefault();
    setError(""); // Bersihkan pesan error sebelumnya

    // CATATAN: Untuk file upload (document) dan category,
    // backend saat ini tidak menyimpannya ke database
    // karena memerlukan penanganan Multer (untuk file) dan skema database tambahan.
    // Kita hanya mengirim data yang bisa diproses oleh backend saat ini.

    try {
      const response = await fetch('http://localhost:5000/api/auth/register-organizer', { // <-- Endpoint backend untuk register organizer
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ // Kirim hanya data yang akan diproses backend saat ini
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          // category dan document tidak disertakan di sini, karena backend tidak menyimpannya saat ini.
          // Jika ingin menyimpan, Anda perlu update backend dan DB schema.
        }),
      });

      const data = await response.json(); // Parse respons dari backend

      if (response.ok) { // Jika status kode 2xx (misal 201 Created)
        console.log("Organizer registration success:", data);
        navigate("/register-organizer-success"); // Navigasi ke halaman sukses
      } else { // Jika status kode 4xx atau 5xx
        console.error("Organizer registration failed:", data.message);
        setError(data.message || "Organizer registration failed. Please try again."); // Tampilkan pesan error dari backend
      }
    } catch (err) {
      console.error("Network or server error during organizer registration:", err);
      setError("An unexpected error occurred. Please try again."); // Tampilkan pesan error umum jika ada masalah jaringan/server
    }
  };

  return (
    <main className="flex flex-col items-stretch bg-[#FCEDDA] min-h-screen">
      <div className="flex flex-1">
        <div className="flex w-full max-w-[1440px] mx-auto">
          {/* Left side - Image - 50% */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:hidden">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/83817893971098d3401af3ef7706cd34fac17075?placeholderIfAbsent=true"
              alt="Organizer Registration"
              className="w-full h-auto max-w-[650px] rounded-[15px]"
            />
          </div>

          {/* Right side - Form - 50% */}
          <div className="w-1/2 flex items-center justify-center p-8 max-md:w-full">
            <div className="w-[630px] max-w-full">
              <form onSubmit={handleSubmit} className="w-full">
                <h1 className="text-black text-center text-[32px] font-bold mb-8">
                  Organizer Data and Identity Form
                </h1>

                {/* Personal Information Section */}
                <section className="space-y-[29px] mb-8">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                    className="w-full min-h-[29px] py-[3px] border-b-[3px] border-black bg-transparent outline-none text-[15px]"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full min-h-[29px] py-[3px] border-b-[3px] border-black bg-transparent outline-none text-[15px]"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    required
                    className="w-full min-h-[29px] py-[3px] border-b-[3px] border-black bg-transparent outline-none text-[15px]"
                  />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="w-full min-h-[29px] py-[3px] border-b-[3px] border-black bg-transparent outline-none text-[15px]"
                  />
                </section>

                {/* Document Upload Section */}
                <section className="mb-8">
                  <h2 className="text-[32px] text-black font-bold text-center mb-4">
                    Upload Legality Document
                  </h2>
                  <div className="flex items-center gap-2">
                    <label className="text-[#FCEDDA] min-h-14 px-[23px] py-4 bg-black font-bold cursor-pointer">
                      Select File
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                    <div className="flex-1 min-h-14 px-[18px] py-4 bg-[#FFDEB5] text-black">
                      {formData.document
                        ? formData.document.name
                        : "No File Selected"}
                    </div>
                  </div>
                </section>

                {/* Category Selection Section */}
                <section className="mb-8">
                  <h2 className="text-[32px] text-black font-bold text-center mb-4">
                    Select Organizer Category
                  </h2>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full text-left min-h-14 px-3.5 py-4 bg-[#FFDEB5] text-base"
                    >
                      {formData.category || "Select Organizer Category"}
                    </button>
                    {isDropdownOpen && (
                      <ul className="absolute w-full bg-[#FFDEB5] border border-black z-10">
                        {categories.map((category) => (
                          <li
                            key={category}
                            onClick={() => {
                              setFormData((prev) => ({ ...prev, category }));
                              setIsDropdownOpen(false);
                            }}
                            className="px-3.5 py-2 hover:bg-[#F8D7A8] cursor-pointer"
                          >
                            {category}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </section>

                {/* Tampilkan pesan error jika ada */}
                {error && <p className="text-red-500 text-sm mt-3">{error}</p>}

                {/* Terms and Submit Section */}
                <div className="w-[490px] max-w-full mx-auto">
                  <p className="text-black text-center text-xs leading-7 mb-4">
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
                    className="w-full text-[#FCEDDA] min-h-[55px] text-xl bg-black px-2.5 py-[13px] rounded-[50px] hover:bg-gray-800 transition-colors"
                  >
                    SIGN UP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register_Organizer;