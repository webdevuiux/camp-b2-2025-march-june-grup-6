import { useState, useEffect } from "react";

// Konfigurasi base URL dari environment variable
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export default function ShareProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("nabilasari4"); // Default value

  // Ambil username dari localStorage saat komponen dimuat
  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        if (
          parsedUserData &&
          typeof parsedUserData === "object" &&
          parsedUserData.username
        ) {
          setUsername(parsedUserData.username);
        }
      } catch (error) {
        console.error("Error parsing userData from localStorage:", error);
        localStorage.removeItem("userData"); // Hapus data korup
      }
    }
  }, []);

  const profileLink = `https://${username}.com`;

  return (
    <div className="text-center">
      {/* Tombol Share */}
      <button
        onClick={() => setIsOpen(true)}
        className="mt-9 bg-[#2B2B2B] rounded-[5px] text-white px-24 md:px-25 py-3 
                   flex items-center justify-center gap-2
                   hover:bg-transparent hover:border-2 hover:border-black transition group
                   md:max-w-none mx-auto"
      >
        <span className="text-base md:text-lg text-[#FCEDDA] group-hover:text-[#2B2B2B] transition">
          Share
        </span>
        <img
          src="./img/share.png"
          alt="Share Icon"
          className="w-5 transition group-hover:hidden"
        />
        <img
          src="./img/shareblack.png"
          alt="Share Icon Black"
          className="w-5 hidden group-hover:block transition"
        />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4">
          <div className="bg-[#FCEEDF] p-6 md:p-8 rounded-xl w-full max-w-lg shadow-xl relative text-left">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-2xl font-bold text-black"
              aria-label="Close modal"
            >
              ×
            </button>

            <h2 className="text-2xl md:text-3xl font-bold text-[#2B2B2B] mb-5">
              Share your profile
            </h2>

            <div className="flex gap-3 mb-4">
              <a href='https://www.linkedin.com/in/hasbul-ihza-firnanda-az'>
                <img
                  src="/img/linkedin.png"
                  alt="LinkedIn"
                  className="w-8 h-8"
                />
              </a>
              <a href='https://www.facebook.com/share/1BvgLxgVnQ/'>
                <img
                  src="/img/facebook.png"
                  alt="Facebook"
                  className="w-8 h-8"
                />
              </a>
              <a href='https://x.com/yourcrush9072?s=21&t=TXn6xYKK6426ZsHyijI5SQ'>
                <img src="/img/x.png" alt="X" className="w-8 h-8" />
              </a>
              <a href="https://www.instagram.com/create/story">
                <img
                  src="/img/instagram.png"
                  alt="Instagram"
                  className="w-8 h-8"
                />
              </a>
              <a href='https://t.me/hasbulajah'>
                <img
                  src="/img/telegram.png"
                  alt="Telegram"
                  className="w-8 h-8"
                />
              </a>
            </div>

            <label className="text-sm text-black mt-8 mb-2 block">
              Share this link
            </label>

            <div className="flex flex-col sm:flex-row items-stretch gap-3">
              <input
                type="text"
                readOnly
                value={profileLink}
                className="w-full sm:flex-1 border px-4 py-3 rounded text-sm bg-white text-[#696767]"
              />
              <button
                className="bg-[#2B2B2B] text-[#FCEDDA] px-6 py-3 rounded-[5px] text-sm 
                           hover:bg-[#FFDEB5] hover:text-[#2B2B2B] transition-colors duration-300"
                onClick={() => {
                  navigator.clipboard.writeText(profileLink);
                  alert("Link copied!");
                }}
              >
                <strong>Copy Link</strong>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
