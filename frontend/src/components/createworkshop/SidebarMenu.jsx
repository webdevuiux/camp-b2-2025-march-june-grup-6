import React, { useState, useEffect } from "react";

const SidebarMenu = () => {
  const [currentTime, setCurrentTime] = useState("");

  // Fungsi untuk memformat waktu saat ini ke format: "Day, Month DD | HH:MM AM/PM"
  const updateTime = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta", // Zona waktu WIB
      weekday: "long", // Nama hari lengkap (Friday)
      month: "long", // Nama bulan lengkap (June)
      day: "2-digit", // Tanggal dua digit (13)
      hour: "2-digit", // Jam dua digit (08)
      minute: "2-digit", // Menit dua digit (07)
      hour12: true, // Format 12 jam dengan AM/PM
    });

    const parts = formatter.formatToParts(now);
    const day = parts.find((part) => part.type === "weekday").value;
    const month = parts.find((part) => part.type === "month").value;
    const date = parts.find((part) => part.type === "day").value;
    const hour = parts.find((part) => part.type === "hour").value;
    const minute = parts.find((part) => part.type === "minute").value;
    const period = parts.find((part) => part.type === "dayPeriod").value;

    setCurrentTime(`${day}, ${month} ${date} | ${hour}:${minute} ${period}`);
  };

  // Perbarui waktu setiap detik
  useEffect(() => {
    updateTime(); // Panggil sekali saat komponen dimuat
    const intervalId = setInterval(updateTime, 1000); // Perbarui setiap detik

    // Bersihkan interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-24 h-[calc(90vh-6rem)] w-64 bg-[#FFDEB5] p-6 flex-shrink-0 rounded-[10px] shadow-lg overflow-auto">
      <h2 className="font-bold text-xl mb-4 text-gray-900">Create an Event</h2>

      <div className="text-sm mb-4 p-3 rounded">
        <p className="text-gray-700">Last Updated</p>
        <p className="font-bold text-black">{currentTime}</p>
        <p className="mt-2 text-gray-700">Status</p>
        <p className="font-bold text-black">Draft</p>
      </div>

      <div className="mt-38 space-y-6 text-sm">
        <div>
          <p className="font-bold text-gray-800 mb-2 uppercase text-xs tracking-wider">
            Event Information
          </p>
          <div className="pl-2 space-y-2">
            <p
              onClick={() => handleScrollTo("upload")}
              className="cursor-pointer transition-colors font-medium text-gray-600 hover:text-black"
            >
              Upload Cover
            </p>
            <p
              onClick={() => handleScrollTo("general")}
              className="cursor-pointer transition-colors font-medium text-gray-600 hover:text-black"
            >
              General Information
            </p>
            <p
              onClick={() => handleScrollTo("location")}
              className="cursor-pointer transition-colors font-medium text-gray-600 hover:text-black"
            >
              Location and Time
            </p>
            <p
              onClick={() => handleScrollTo("ticket")}
              className="cursor-pointer transition-colors font-medium text-gray-600 hover:text-black"
            >
              Ticket
            </p>
          </div>

          <div className="border-b border-black my-4" />
        </div>

        <div>
          <p className="font-bold text-gray-800 mb-2 uppercase text-xs tracking-wider">
            Publish Event
          </p>
          <div className="pl-2 space-y-2">
            <p
              onClick={() => handleScrollTo("review")}
              className="cursor-pointer transition-colors font-medium text-gray-600 hover:text-black"
            >
              Review and Publish
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarMenu;
