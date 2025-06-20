import React, { useState, useEffect } from "react";

const SidebarMenu = () => {
  const [currentTime, setCurrentTime] = useState("");

  const updateTime = () => {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      weekday: "long",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
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

  useEffect(() => {
    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full md:w-64 bg-[#FFDEB5] p-4 sm:p-6 md:sticky md:top-24 md:h-[calc(90vh-6rem)] md:flex-shrink-0 md:rounded-[10px] shadow-md">
      <h2 className="font-bold text-lg sm:text-xl mb-2 sm:mb-4 text-gray-900">
        Create an Event
      </h2>

      <div className="text-xs sm:text-sm mb-2 sm:mb-4 p-2 sm:p-3 rounded">
        <p className="text-gray-700">Last Updated</p>
        <p className="font-bold text-black">{currentTime}</p>
        <p className="mt-2 text-gray-700">Status</p>
        <p className="font-bold text-black">Draft</p>
      </div>

      <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6 text-xs sm:text-sm">
        <div>
          <p className="font-bold text-gray-800 mb-2 uppercase text-xs sm:text-sm tracking-wider">
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

          <div className="border-b border-black my-2 sm:my-4" />
        </div>

        <div>
          <p className="font-bold text-gray-800 mb-2 uppercase text-xs sm:text-sm tracking-wider">
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