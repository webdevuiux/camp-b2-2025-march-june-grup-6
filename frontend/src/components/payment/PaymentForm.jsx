import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const PaymentForm = () => {
  const { id: workshopId } = useParams(); // Ambil workshopId dari URL
  const navigate = useNavigate(); // Untuk navigasi setelah pengiriman
  const location = useLocation(); // Untuk mengambil state dari navigasi
  const workshop = location.state?.workshop || {}; // Ambil data workshop dari state

  // Ambil data pengguna dari localStorage dengan kunci yang benar "userData"
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const [firstName, setFirstName] = useState(userData.firstName || "");
  const [lastName, setLastName] = useState(userData.lastName || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(
    userData.phone ? userData.phone.slice(1) : ""
  ); // Hilangkan angka pertama dari phone
  const [ticketCount, setTicketCount] = useState(1);
  const [sameContact, setSameContact] = useState(true);
  const [cardNumber, setCardNumber] = useState("");
  const [fullName, setFullName] = useState(""); // Tetap ada di Payment Method
  const [error, setError] = useState(null);

  const ticketPrice = workshop.price || 350000; // Gunakan harga dari workshop jika ada
  const totalPrice = ticketCount * ticketPrice;

  const handleIncrement = () => setTicketCount(ticketCount + 1);
  const handleDecrement = () => {
    if (ticketCount > 1) setTicketCount(ticketCount - 1);
  };

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  // Fungsi untuk mengirim data pemesanan ke backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !fullName ||
      !cardNumber
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const bookingData = {
      workshop_id: workshopId,
      quantity: ticketCount,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: "0" + phone,
      full_name: fullName,
      card_number_last4: cardNumber.slice(-4),
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(bookingData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to book workshop");
      }

      navigate("/payment-now", {
        state: {
          id: result.id,
          workshopId,
          fullName: fullName,
          cardNumberLast4: cardNumber.slice(-4),
          ticketCount,
          ticketPrice,
          totalPrice,
          firstName,
          lastName,
          email,
          phone: "0" + phone,
          code: result.code, // Gunakan kode dari backend
          accountNumber: result.account_number,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#F5E8D9] mt-7 p-10 min-h-screen">
      {/* Main Content (Left Section) */}
      <div className="flex-1 space-y-6 pr-6">
        {/* Title */}
        <div>
          <p className="text-sm font-medium text-gray-600">Purchase Ticket</p>
          <h1 className="text-2xl font-bold mt-1">
            {workshop.topic || "Wheel Throwing for Beginners"}
          </h1>
        </div>

        {/* Date and Place Info */}
        <div className="flex gap-8 py-6">
          {/* DATE AND TIME */}
          <div className="bg-[#FFE2BD] px-6 py-4 rounded-md flex items-center gap-4 w-[300px]">
            <img
              src="/img/calender.svg"
              alt="Calendar Icon"
              className="w-10 h-10"
            />
            <div>
              <h3 className="font-bold text-sm">DATE AND TIME</h3>
              <p className="text-sm">{workshop.date || "June 5, 2025"}</p>
              <p className="text-sm">{workshop.time || "Thursday | 10:00"}</p>
            </div>
          </div>

          {/* PLACE */}
          <div className="bg-[#FFE2BD] px-6 py-4 rounded-md flex items-center gap-4 w-[300px]">
            <img
              src="/img/location.svg"
              alt="Location Icon"
              className="w-10 h-10"
            />
            <div>
              <h3 className="font-bold text-sm">PLACE</h3>
              <p className="text-sm">
                {workshop.location || "Jakarta, Indonesia"}
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h2 className="font-bold text-lg mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-[#E8DCCF] border px-5 py-3 rounded text-base"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              className="bg-[#E8DCCF] border px-5 py-3 rounded text-base"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              className="bg-[#E8DCCF] border px-5 py-3 rounded text-base"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-base">
                +62
              </div>
              <input
                type="tel"
                className="bg-[#E8DCCF] border pl-14 pr-4 py-3 rounded w-full text-base"
                placeholder="8xx xxxx xxxx"
                value={phone}
                maxLength={11}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                required
              />
            </div>
          </div>
          {userData.firstName && (
            <p className="text-sm text-gray-500 mt-2">
              Contact details are pre-filled based on your account. Update if
              needed.
            </p>
          )}
          {/* Error Message */}
          {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
        </div>

        {/* Ticket Section */}
        <div className="space-y-4 bg-[#FEEBD7] p-6 rounded">
          <h2 className="text-xl font-bold">Ticket</h2>

          <div className="flex items-center justify-between bg-[#FFE1BF] p-4 rounded-md">
            <span className="font-semibold text-lg">
              {formatRupiah(ticketPrice)} / ticket
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDecrement}
                className="bg-white text-lg w-9 h-9 rounded border"
              >
                −
              </button>
              <span className="font-semibold text-lg">{ticketCount}</span>
              <button
                onClick={handleIncrement}
                className="bg-[#FF6B00] text-white text-lg w-9 h-9 rounded"
              >
                +
              </button>
            </div>
          </div>

          <p className="text-right mb-4 text-base font-medium text-gray-700">
            Total: <span className="font-bold">{formatRupiah(totalPrice)}</span>
          </p>

          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <img src="/img/ticket.svg" alt="ticket" className="w-5 h-5" />
              TICKET 1
            </h3>
            <label className="text-sm flex items-center gap-2">
              <input
                type="checkbox"
                checked={sameContact}
                onChange={() => setSameContact(!sameContact)}
                className="w-3 h-3"
              />
              Same Contact information
            </label>
          </div>

          {!sameContact && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              <input
                className="bg-[#E8DCCF] border px-4 py-2.5 rounded text-base"
                placeholder="First Name"
              />
              <input
                className="bg-[#E8DCCF] border px-4 py-2.5 rounded text-base"
                placeholder="Last Name"
              />
              <input
                className="bg-[#E8DCCF] border px-4 py-2.5 rounded text-base"
                placeholder="Email"
              />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-base">
                  +62
                </div>
                <input
                  type="tel"
                  className="bg-[#E8DCCF] border pl-12 pr-4 py-2.5 rounded w-full text-base"
                  placeholder="8xx xxxx xxxx"
                  maxLength={12}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary (Right Section) */}
      <div
        className="w-[300px] bg-[#FFDEB5] mt-7 p-6 rounded-lg space-y-4 
                min-h-[300px] max-h-[80vh] overflow-y-auto"
      >
        <h2 className="font-bold text-lg">Summary</h2>
        <div className="flex justify-between">
          <span>1x</span>
          <span>{formatRupiah(ticketPrice)} / ticket</span>
        </div>
        <div className="border-b border-black my-2"></div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatRupiah(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Discount</span>
          <span>None</span>
        </div>
        <div className="border-b border-black my-2"></div>
        <div className="flex justify-between font-bold">
          <span>TOTAL</span>
          <span>{formatRupiah(totalPrice)}</span>
        </div>
        <div className="border-b border-black my-2"></div>
        <div className="flex flex-col">
          <span className="text-sm mb-1">Payment method - Transfer</span>
          <input
            type="text"
            className="bg-[#E8DCCF] border px-4 py-2 rounded w-full text-base text-center"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            type="text"
            className="bg-[#E8DCCF] border px-4 py-2 mt-2 rounded w-full text-base text-center"
            placeholder="Enter card number"
            value={cardNumber}
            onChange={(e) =>
              setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
            }
            maxLength={16}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-[#FF6B00] text-white py-2 rounded hover:bg-opacity-90"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;
