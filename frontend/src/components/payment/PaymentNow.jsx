import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentNowSummary from "./PaymentNowSummary";
import PaymentNowForm from "./PaymentNowForm";

const PaymentNow = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // State untuk loading
  const ticketCount = state?.ticketCount || 1;
  const ticketPrice = state?.ticketPrice || 350000;
  const subtotal = ticketCount * ticketPrice;
  const firstName = state?.firstName || "Nabila";
  const lastName = state?.lastName || "Sari";
  const email = state?.email || "nabilasari4@gmail.com";
  const phone = state?.phone || "(+62)555-2304-324";
  const code = state?.code || "MRCE-32945"; // Kode dari backend
  const fullName = state?.fullName || "";
  const id = state?.id || null; // booking_id dari state
  const cardNumberLast4 = state?.cardNumberLast4 || "";
  const accountNumber = state?.accountNumber || "1234-5678-9012-3456";

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  // Fungsi untuk memproses pembayaran
  const handleProceedPayment = () => {
    setLoading(true);
    // Tidak perlu panggilan API karena pemesanan sudah dilakukan di PaymentForm.jsx
    // Langsung navigasi ke /payment-success dengan data dari state
    try {
      navigate("/payment-success", {
        state: {
          id,
          fullName,
          cardNumberLast4,
          ticketCount,
          ticketPrice,
          subtotal,
          firstName,
          lastName,
          email,
          phone,
          code, // Gunakan kode dari state (dari backend)
          accountNumber,
          message: "Your payment is pending admin confirmation.",
        },
      });
    } catch (err) {
      console.error(err);
      alert("An error occurred during navigation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED] px-4 sm:px-6 md:px-10 lg:px-20 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Ticket Detail */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h2 className="text-lg font-bold">
              Ticket ({ticketCount}) total: {formatRupiah(subtotal)}
            </h2>
            {id && <p className="text-sm text-gray-600">Booking ID: {id}</p>}
          </div>

          <div className="bg-[#FEE4C4] rounded-sm overflow-hidden flex flex-col md:flex-row">
            <div className="flex-1 w-full">
              <div className="flex items-center gap-2 mt-8 ml-8 mb-8 font-bold text-base">
                <img
                  src="/img/ticket.svg"
                  alt="Ticket Icon"
                  className="w-7 h-7"
                />
                TICKET 1
              </div>
              <div className="ml-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm pb-6">
                <div>
                  <p className="text-[#000000]">First Name</p>
                  <p className="text-[#000000]">{firstName}</p>
                </div>
                <div>
                  <p className="text-[#000000]">Last Name</p>
                  <p className="text-[#000000]">{lastName}</p>
                </div>
                <div>
                  <p className="text-[#000000]">Email</p>
                  <p className="text-[#000000] break-words">{email}</p>
                </div>
                <div>
                  <p className="text-[#000000]">Phone Number</p>
                  <p className="text-[#000000]">{phone}</p>
                </div>
                <div>
                  <p className="text-[#000000]">Code</p>
                  <p className="font-bold">{code}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#FF570C] flex items-center justify-center px-2 py-10 md:w-1/5">
              <img
                src="/img/qrcode_sementara.svg"
                alt="QR Code"
                className="w-24 h-24"
              />
            </div>
          </div>
        </div>

        {/* Layout: Summary kiri, form kanan */}
        <div className="flex flex-col lg:flex-row gap-6">
          <PaymentNowSummary
            ticketCount={ticketCount}
            ticketPrice={ticketPrice}
          />

          {/* Form pembayaran kanan */}
          <div className="flex-1 max-w-sm bg-white rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
            <PaymentNowForm
              fullName={fullName}
              cardNumberLast4={cardNumberLast4}
              accountNumber={accountNumber}
            />

            <button
              onClick={handleProceedPayment}
              className="bg-black text-white w-full py-2 rounded font-semibold hover:bg-gray-800 transition mt-4"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentNow;
