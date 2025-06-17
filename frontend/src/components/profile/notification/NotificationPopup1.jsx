import React from "react";

const NotificationPopup1 = ({ onClose, notification }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Debug: Log notification data
  // console.log("Notification props:", notification);

  // Hanya proses jika tipe adalah purchase_confirmation dan data lengkap
  if (
    notification?.type !== "purchase_confirmation" ||
    !notification?.workshop_title
  ) {
    return null; // Atau tampilkan pesan error jika data tidak lengkap
  }

  // Gunakan data dari notification atau nilai default jika tidak ada
  const workshopTitle = notification.workshop_title || "Unnamed Workshop";
  const workshopDate = notification.workshop_date
    ? new Date(notification.workshop_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "April 11th, 2025";
  const workshopTime = notification.workshop_time || "14:00";

  // const handleRefundClick = () => {
  //   window.location.href = "/refund"; // Sesuaikan URL sesuai kebutuhan
  // };

  return (
    <div
      className="fixed inset-0 bg-black/20 z-50 flex justify-end items-start pt-10"
      onClick={handleOverlayClick}
    >
      <div
        className="w-[600px] h-[550px] bg-[#FCEDDA] mt-6 shadow-lg p-6 animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-sm font-mono font-bold tracking-wide">
            Notification
          </h2>
          <button
            onClick={onClose}
            className="text-sm font-mono tracking-wide hover:text-black"
          >
            Close - X
          </button>
        </div>

        <div className="flex gap-4 mt-10 mb-8">
          <div className="relative w-14 h-14 shrink-0 overflow-hidden">
            <img
              src="./img/frame1.png"
              alt="notif"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-bold text-xl">
              Workshop Purchase Confirmation
            </h3>
            <p className="text-xs mt-2 text-[#000000]">
              {new Date().toLocaleString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        <div className="text-md ml-18 mr-18 text-[#000000] space-y-4">
          <p>
            {`Congratulations! Your spot for the "${workshopTitle}" scheduled for ${workshopTime} on ${workshopDate} has been successfully confirmed. Thank you for your purchase!`}
          </p>
          <p>
            We’re excited to have you join us. Please arrive 10 minutes early to
            settle in.
          </p>

          {/* <div className="text-center">
            <button
              onClick={handleRefundClick}
              className="bg-[#2B2B2B] text-white px-8 py-[10px] rounded-[5px] font-semibold hover:bg-[#FFDEB5] hover:text-[#2B2B2B] transition-colors duration-300"
            >
              Request Refund
            </button>
          </div> */}

          <p>
            Thank you for choosing us. We look forward to seeing you at the
            workshop!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup1;
