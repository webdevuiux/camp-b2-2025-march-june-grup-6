import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const TicketsDetail = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams(); // Ambil booking_id dari URL
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    // console.log("Booking ID from URL:", bookingId);
    // console.log("Token from localStorage:", localStorage.getItem("token"));
    const fetchTicketDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token autentikasi tidak ditemukan. Silakan login.");
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
          const errorText = await response.text();
          throw new Error(
            `Gagal mengambil detail tiket: ${errorText} (Status: ${response.status})`
          );
        }
        const data = await response.json();
        // console.log("API Response:", data); // Logging untuk debugging
        setTicket(data);
      } catch (err) {
        console.error("Error mengambil detail tiket:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTicketDetail();
  }, [bookingId]);

  const handleRefundClick = () => {
    navigate(`/refund/${bookingId}`);
  };

  const formatPhoneNumber = (phone) => {
    if (!phone) return "(+62)555-2304-324";
    return phone.startsWith("+62") ? `0${phone.slice(3)}` : phone;
  };

  if (loading) return <div className="p-6 text-center">Memuat...</div>;
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>;
  if (!ticket)
    return <div className="p-6 text-center">Data tiket tidak ditemukan.</div>;

  return (
    <div className="bg-[#FCEDDA] min-h-screen font-Roboto px-6 md:px-20 py-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mt-14 mb-6 -ml-8 hover:underline"
      >
        <img src="/img/arrow_back.svg" alt="Back Icon" className="w-8 h-8" />
      </button>

      {/* Date & Title */}
      <div className="text-xs flex items-center gap-2 mb-1">
        <img src="/img/calender.svg" alt="Calender Icon" className="w-4 h-4" />
        {new Date(ticket.workshop_date).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>
      <h1 className="text-2xl font-bold mb-6">
        {ticket.title || "Workshop Title"}
      </h1>

      {/* Wrapper Gambar + InfoBox */}
      <div className="flex flex-col md:flex-row gap-6 mb-4 items-stretch">
        {/* KIRI: Gambar saja */}
        <div className="md:w-1/2">
          <img
            src={ticket.image_url || "/img/WD.png"}
            alt="Workshop"
            className="w-full h-full object-cover"
            style={{ aspectRatio: "2/1", objectFit: "cover" }}
          />
        </div>

        {/* KANAN: InfoBox */}
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoBox
            icon="/img/calender.svg"
            title="DATE AND TIME"
            content={`${new Date(ticket.workshop_date).toLocaleDateString(
              "en-US",
              { month: "long", day: "numeric", year: "numeric" }
            )}\n${ticket.time || "Thursday | 10:00"}`}
          />
          <InfoBox
            icon="/img/clock.svg"
            title="DURATION"
            content={
              calculateDuration(ticket.time, ticket.end_time) || "3 hours"
            } // Fungsi untuk menghitung durasi
          />
          <InfoBox
            icon="/img/location.svg"
            title="PLACE"
            content={ticket.location || "Jakarta, Indonesia"}
          />
          <InfoBox
            icon="/img/ticket.svg"
            title="1 TICKETS"
            content="Email eTicket" // Bisa diubah jika ada field spesifik dari API
          />
        </div>
      </div>

      {/* Tombol */}
      <Link to={`/workshop-detail/${ticket.workshop_id}`}>
        <button className="bg-[#FF570C] rounded-[5px] text-white px-3 py-1 text-[10px]">
          View Workshop Details
        </button>
      </Link>

      {/* Section: Ticket Detail */}
      <div className="mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <h2 className="text-lg font-bold">
            Ticket (1) total: Rp. {ticket.price || "350,000"}
          </h2>
          <button
            onClick={handleRefundClick}
            className="bg-[#FF570C] text-white text-sm px-[77px] py-2 rounded-[5px] hover:bg-opacity-90 mt-2 md:mt-0"
          >
            Refund Ticket
          </button>
        </div>

        {/* Ticket Box */}
        <div className="bg-[#FEE4C4] rounded-sm overflow-hidden flex flex-col md:flex-row">
          {/* Left Side: Ticket Info */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mt-8 ml-8 mb-8 font-bold text-base">
              <img
                src="/img/ticket.svg"
                alt="Ticket Icon"
                className="w-7 h-7"
              />
              TICKET 1
            </div>

            <div className="ml-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-sm">
              <div>
                <p className="text-[#000000]">First Name</p>
                <p className="text-[#000000]">
                  {ticket.first_name || ticket.user?.first_name || "Nabila"}
                </p>
              </div>
              <div>
                <p className="text-[#000000]">Last Name</p>
                <p className="text-[#000000]">
                  {ticket.last_name || ticket.user?.last_name || "Sari"}
                </p>
              </div>
              <div>
                <p className="text-[#000000]">Email</p>
                <p className="text-[#000000] break-words">
                  {ticket.email ||
                    ticket.user?.email ||
                    "nabilasari4@gmail.com"}
                </p>
              </div>
              <div>
                <p className="text-[#000000]">Phone Number</p>
                <p className="text-[#000000]">
                  {formatPhoneNumber(ticket.phone)}
                </p>
              </div>
              <div>
                <p className="text-[#000000]">Code</p>
                <p className="font-bold">{ticket.code || "MRCE-32945"}</p>
              </div>
            </div>
          </div>

          {/* Right Side: QR Code */}
          <div className="bg-[#FF570C] flex items-center justify-center px-2 py-10 md:w-1/5">
            <img
              src="/img/qrcode_sementara.svg"
              alt="QR Code"
              className="w-24 h-24"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Fungsi untuk menghitung durasi berdasarkan waktu mulai dan akhir
const calculateDuration = (startTime, endTime) => {
  if (!startTime || !endTime) return "3 hours";
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  const durationMinutes = end - start;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${
    minutes > 1 ? "s" : ""
  }`;
};

const InfoBox = ({ icon, title, content }) => (
  <div className="bg-[#FEE4C4] p-4 shadow-md rounded-sm">
    <div className="mt-4 flex gap-6 ml-2">
      <img src={icon} alt={`${title} icon`} className="w-12 h-12 mt-2" />
      <div>
        <h3 className="text-lg font-bold mb-1">{title}</h3>
        <p className="text-base whitespace-pre-line">{content}</p>
      </div>
    </div>
  </div>
);

export default TicketsDetail;
