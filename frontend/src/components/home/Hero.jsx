// src/components/Hero.jsx
import React from "react";
import { Headphones } from "lucide-react"; // ganti ikon bila perlu

const Hero = () => {
  return (
    <section className="bg-[#FCEDDA] px-6 py-32">
      <div className="mx-auto max-w-10xl">
        {/* ===== AREA 1 – JUDUL ===== */}
        <div className="relative">
          <img
            src="/logohero.svg"
            alt="Tiket Karya"
            className="h-[160px] md:h-[180px]"
          />
        </div>

        {/* ===== AREA 2 – KONTEN BARIS ===== */}
        <div className="mt-20 flex flex-col gap-10 lg:flex-row">
          {/* —— KIRI —— */}
          <div className=" w-full lg:w-1/2">
            <p className="text-lg leading-7 text-gray-900">
              Discover creative workshops near you — from hands‑on pottery to
              soulful music and textile arts. Join a growing community of
              makers, artists, and curious minds looking to learn, connect, and
              create together. Whether you're trying something new or deepening
              your skills, TiketKarya makes it easy to find, book, and enjoy
              creative experiences that spark inspiration.
            </p>

            <a
              href="#workshops"
              className="mt-5 inline-block text-base font-medium underline"
            >
              Find Workshops
            </a>
          </div>

          {/* —— KANAN —— */}
          <div className="flex w-full flex-col items-center lg:w-1/2 lg:items-end mt-[-25px]">
            <video
              src="/VID.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="bottom-48 w-48 rounded-xs object-cover shadow-lg md:w-[370px]"
            />
            {/* Mengubah tombol menjadi tag <a> (link) agar bisa diklik */}
            <a
              href="/customer-service"
              className="fixed bottom-10 right-10 z-50 flex items-center gap-2 rounded-full bg-[#FF5126] px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#ff693f]"
            >
              <Headphones size={18} />
              Customer Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
