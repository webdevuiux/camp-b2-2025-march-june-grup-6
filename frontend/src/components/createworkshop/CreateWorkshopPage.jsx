import React, { useState, useEffect } from "react";
import SidebarMenu from "./SidebarMenu";
import UploadCover from "./UploadCover";
import GeneralInformation from "./GeneralInformation";
import LocationAndTime from "./LocationAndTime";
import TicketSection from "./TicketSection";
import ReviewAndPublish from "./ReviewAndPublish";
import { useNavigate, useLocation } from "react-router-dom";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

// Fungsi utilitas untuk memformat tanggal ke YYYY-MM-DD
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";
  return date.toISOString().split("T")[0];
};

// Fungsi utilitas untuk memformat waktu ke HH:mm
const formatTime = (timeStr) => {
  if (!timeStr) return "";
  const parts = timeStr.split(":");
  if (parts.length >= 2) {
    return `${parts[0]}:${parts[1]}`;
  }
  return "";
};

const CreateWorkshopPage = () => {
  const [currentSection, setCurrentSection] = useState("form");
  const navigate = useNavigate();
  const location = useLocation();

  // Inisialisasi state dengan data dari location.state jika ada
  const workshop = location.state?.workshop || {};
  console.log("CreateWorkshopPage workshop data:", workshop); // Debug data workshop

  const [coverData, setCoverData] = useState({
    image: workshop.image_url || "",
  });
  const [generalData, setGeneralData] = useState({
    title: workshop.topic || "",
    description: workshop.description || "",
    category: workshop.category || "Lifestyle & Home",
  });
  const [locationData, setLocationData] = useState({
    location: workshop.location || "",
    date: formatDate(workshop.date),
    time: formatTime(workshop.time),
    endTime: formatTime(workshop.end_time || ""),
  });
  const [ticketData, setTicketData] = useState({
    ticketType: workshop.price > 0 ? "paid" : "free",
    quantity: workshop.quantity || "",
    price: workshop.price || "",
    maxParticipants: workshop.quantity || "",
    startDate: formatDate(workshop.start_date),
    endDate: formatDate(workshop.end_date),
    startTime: formatTime(workshop.sale_start_time),
    endTime: formatTime(workshop.sale_end_time),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    const userData = localStorage.getItem("userData");
    if (!userData) {
      setError("User data not found in localStorage");
      setLoading(false);
      return;
    }

    const parsedUserData = JSON.parse(userData);
    const userId = parsedUserData.id;
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User not authenticated. Please log in.");
      setLoading(false);
      return;
    }

    const categoryMap = {
      "Lifestyle & Home": 1,
      "Art & Design": 2,
      "Food & Drink": 3,
      "Business & Career": 4,
    };
    const categoryId = categoryMap[generalData.category] || 1;

    const formData = {
      submission_id: workshop.submission_id || null,
      title: generalData.title || "",
      description: generalData.description || "",
      category_id: categoryId,
      instructor_id: userId,
      submitter_user_id: userId,
      price: ticketData.price || 0,
      location: locationData.location || "",
      date: locationData.date || "",
      time: locationData.time || "",
      end_time: locationData.endTime || "",
      max_participants: ticketData.maxParticipants || ticketData.quantity || 0,
      image_url: coverData.image || null,
      start_date: ticketData.startDate || "",
      end_date: ticketData.endDate || "",
      sale_start_time: ticketData.startTime || "",
      sale_end_time: ticketData.endTime || "",
    };

    console.log("CreateWorkshopPage sending formData:", formData); // Debug formData

    // Validasi field wajib sebelum pengiriman
    const requiredFields = [
      "title",
      "description",
      "category_id",
      "instructor_id",
      "submitter_user_id",
      "location",
      "date",
      "time",
      "end_time",
      "start_date",
      "end_date",
      "sale_start_time",
      "sale_end_time",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      setError(`Required fields are missing: ${missingFields.join(", ")}`);
      setLoading(false);
      return;
    }

    try {
      const isUpdate = formData.submission_id;
      const url = isUpdate
        ? `${API_BASE_URL}/api/workshops/submissions/${formData.submission_id}`
        : `${API_BASE_URL}/api/workshops/workshops/submissions`;
      const method = isUpdate ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit workshop: ${errorText}`);
      }

      const data = await response.json();
      setSuccess("Workshop submitted successfully!");
      setTimeout(() => {
        navigate("/create-workshop/success");
      }, 1000);
      setCoverData({});
      setGeneralData({});
      setLocationData({});
      setTicketData({});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-[#FCEDDA] pl-6 pt-14 min-h-screen">
      <SidebarMenu />
      <div className="flex-1 p-8 space-y-16 overflow-y-auto">
        {currentSection === "form" && (
          <>
            <div id="upload">
              <UploadCover data={coverData} onChange={setCoverData} />
            </div>
            <div id="general">
              <GeneralInformation
                data={generalData}
                onChange={setGeneralData}
              />
            </div>
            <div id="location">
              <LocationAndTime data={locationData} onChange={setLocationData} />
            </div>
            <div id="ticket">
              <TicketSection
                data={ticketData}
                onChange={setTicketData}
                onNext={() => setCurrentSection("review")}
              />
            </div>
          </>
        )}
        {currentSection === "review" && (
          <ReviewAndPublish
            coverData={coverData}
            generalData={generalData}
            locationData={locationData}
            ticketData={ticketData}
            onBack={() => setCurrentSection("form")}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            success={success}
          />
        )}
      </div>
    </div>
  );
};

export default CreateWorkshopPage;
