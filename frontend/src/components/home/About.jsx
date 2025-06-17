// src/components/About.jsx
import React from "react";
import { FaTwitter, FaInstagram, FaTiktok } from "react-icons/fa"; 

const About = () => {
  return (
    <section className="flex flex-col lg:flex-row">
      {/* ===== KIRI 30 % ===== */}
      <div className="relative flex w-full items-center justify-center lg:w-[40%]">
        {/* background foto */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/7950718139f3a660d1ce5fb2d767acdf9016f780?placeholderIfAbsent=true"
          alt="Creative studio background"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* ikon putih di tengah */}
        <img
          src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/58df4650d56c4d0ad9d681d1c55532bcb5890988?placeholderIfAbsent=true"
          alt="TiketKarya logo"
          className="relative z-10 w-56 lg:w-72"
        />
      </div>

      {/* ===== KANAN 70 % ===== */}
      <div className="relative flex w-full flex-col justify-center bg-[#FF5126] px-8 py-16 text-[#F7F7F7] lg:w-[60%]">
        {/* baris judul + ikon sosmed */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-5xl font-bold tracking-wide md:text-6xl">
            ABOUT
          </h2>

          <div className="flex gap-4 text-2xl">
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://tiktok.com" aria-label="TikTok">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* teks deskripsi */}
        <div className="max-w-2xl space-y-8 text-lg leading-7">
          <p>
            TiketKarya offers an easy and inspiring way to discover creative
            programs, all in one place. With a clean interface and smart search
            tools, users can explore workshops that match their interests—from
            pottery and painting to textile arts and music. Signing up is
            simple, with flexible payment options to make the process smooth and
            accessible.
          </p>

          <p>
            Interactive features like reviews, ratings, and forum discussions
            help users share experiences and discover trusted recommendations.
            TiketKarya opens wider access to the creative world, builds an
            active community, and supports the growth of a more inclusive and
            connected creative industry.
          </p>

          <a
            href="#explore"
            className="inline-block underline underline-offset-4"
          >
            Explore
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
