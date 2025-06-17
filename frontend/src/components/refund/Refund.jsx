import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Refund = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams(); // Ambil booking_id dari URL
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    reason: "",
    workshopCode: "",
    workshopTitle: "",
    imageUrl: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const token = localStorage.getItem("token");

  useEffect(() => {
    // console.log("Booking ID from URL:", bookingId);
    // console.log("Token from localStorage:", localStorage.getItem("token"));
    const fetchBookingDetail = async () => {
      try {
        if (!bookingId || !token) {
          throw new Error("Booking ID or token not found");
        }
        const response = await fetch(
          `${API_BASE_URL}/api/bookings/bookings/${bookingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch booking: ${await response.text()}`);
        }
        const data = await response.json();
        setFormData((prev) => ({
          ...prev,
          firstName: data.first_name || "",
          lastName: data.last_name || "",
          email: data.email || "",
          workshopCode: data.code || "MRCE-32945",
          workshopTitle: data.title || "Wheel Throwing for Beginners",
          imageUrl:
            data.image_url ||
            "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/d64732c7127889f2398212d07461d512cee5dbdf",
        }));
      } catch (err) {
        console.error("Error fetching booking detail:", err);
      }
    };
    fetchBookingDetail();
  }, [bookingId, token, API_BASE_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const { firstName, lastName, email, reason } = formData;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsFormValid(
      firstName.trim() !== "" &&
        lastName.trim() !== "" &&
        email.trim() !== "" &&
        emailValid &&
        reason.trim() !== ""
    );
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/refunds/refund-requests`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              booking_id: bookingId,
              reason: formData.reason,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to submit refund request");
        }
        navigate("/refund-success");
      } catch (err) {
        console.error("Error submitting refund request:", err);
      }
    }
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <main
      style={{
        backgroundImage: "url('/img/bg_refund.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
      className="flex flex-col overflow-hidden relative min-h-screen items-stretch pt-1.5 pb-10 px-[50px] max-md:pb-10 max-md:px-5"
    >
      <div className="relative self-center flex w-[720px] max-w-full mt-10 bg-[#FCEDDA] bg-opacity-95 shadow-lg">
        <button
          onClick={handleClose}
          className="absolute top-4 left-4 z-10 hover:opacity-75 transition-opacity"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/d853ef54fe28a5f22679ec4f190a5f1032ce6374"
            alt="Back"
            className="aspect-[1] object-contain w-[30px]"
          />
        </button>
        <div className="w-full p-8">
          <div className="text-center mb-8">
            <img
              src="/img/logo_tk_blackwhite.svg"
              alt="Logo Tiket Karya"
              className="mx-auto mt-12 w-50 h-auto object-contain"
            />
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-black mb-4">
              Workshop yang Akan Direfund
            </h2>
            <div
              className="flex items-center gap-4 p-4 bg-white border border-gray-200"
              style={{ borderRadius: "5px" }}
            >
              <img
                src={formData.imageUrl}
                alt="Workshop thumbnail"
                className="w-24 h-24 object-cover"
                style={{ borderRadius: "5px" }}
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-black">
                  {formData.workshopTitle}
                </h3>
                <div className="text-gray-600 mt-1">
                  Kode:{" "}
                  <span className="font-bold">{formData.workshopCode}</span>
                </div>
              </div>
              <div className="shrink-0">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/1188fab03c11d73dffbabb5b8d8acd0253b3bd90"
                  alt="Selected"
                  className="w-12 h-12"
                  style={{ borderRadius: "5px" }}
                />
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-black">
              Isi Form Refund di Bawah Ini
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Nama Depan"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  style={{ borderRadius: "5px", borderColor: "#D1D5DB" }}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Nama Belakang"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border bg-white focus:border-black focus:ring-1 focus:ring-black transition-colors"
                  style={{ borderRadius: "5px", borderColor: "#D1D5DB" }}
                  required
                />
              </div>
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border bg-white focus:border-black focus:ring-1 focus:ring-black transition-colors"
                style={{ borderRadius: "5px", borderColor: "#D1D5DB" }}
                required
              />
            </div>

            <div>
              <textarea
                name="reason"
                placeholder="Alasan Refund"
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border bg-white focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                style={{ borderRadius: "5px", borderColor: "#D1D5DB" }}
                required
              />
            </div>

            <div className="text-center text-sm text-gray-600">
              Dengan melanjutkan, Anda menyetujui{" "}
              <a
                href="#"
                className="underline hover:text-black transition-colors"
              >
                Syarat dan Ketentuan
              </a>{" "}
              dan{" "}
              <a
                href="#"
                className="underline hover:text-black transition-colors"
              >
                Kebijakan Privasi
              </a>{" "}
              kami
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full bg-black text-white text-xl font-semibold py-4 rounded-lg hover:bg-opacity-90 transition-colors ${
                !isFormValid ? "cursor-not-allowed opacity-70" : ""
              }`}
            >
              Setuju & Kirim Permintaan
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Refund;
