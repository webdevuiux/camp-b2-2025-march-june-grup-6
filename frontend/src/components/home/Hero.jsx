import React from "react";

const Hero = () => {
  return (
    <section className="bg-[#FCEDDA] px-4 sm:px-6 py-16 max-md:py-10">
      <div className="mx-auto max-w-7xl sm:max-w-10xl">
        {/* ===== AREA 1 – JUDUL ===== */}
        <div className="relative flex justify-center">
          <img
            src="/logohero.svg"
            alt="Tiket Karya"
            className="h-[120px] sm:h-[160px] md:h-[180px]"
          />
        </div>

        {/* ===== AREA 2 – KONTEN BARIS ===== */}
        <div className="mt-10 sm:mt-20 flex flex-col sm:flex-row gap-6 sm:gap-10 lg:gap-20">
          {/* —— KIRI —— */}
          <div className="w-full sm:w-1/2">
            <p className="text-base sm:text-lg leading-6 sm:leading-7 text-gray-900">
              Discover creative workshops near you — from hands‑on pottery to
              soulful music and textile arts. Join a growing community of
              makers, artists, and curious minds looking to learn, connect, and
              create together. Whether you're trying something new or deepening
              your skills, TiketKarya makes it easy to find, book, and enjoy
              creative experiences that spark inspiration.
            </p>

            <a
              href="#workshops"
              className="mt-4 sm:mt-5 inline-block text-sm sm:text-base font-medium underline"
            >
              Find Workshops
            </a>
          </div>

          {/* —— KANAN —— */}
          <div className="flex w-full flex-col items-center sm:items-end mt-[-20px] sm:mt-[-25px]">
            <video
              src="/VID.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-32 sm:w-48 md:w-[370px] rounded-xs object-cover shadow-lg"
            />
            {/* Mengganti <Headphones /> dengan SVG inline */}
            <a
              href="/customer-service"
              className="fixed bottom-4 sm:bottom-10 right-4 sm:right-10 z-50 flex items-center gap-2 rounded-full bg-[#FF5126] px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-[#ff693f]"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.761 0-5 2.239-5 5v1h10v-1c0-2.761-2.239-5-5-5z"
                />
              </svg>
              Customer Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;