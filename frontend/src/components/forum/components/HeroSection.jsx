import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-68 overflow-hidden mt-8 mb-6 shadow-lg">
      {/* Gambar Latar */}
      <img
        src="img/banner_forum.svg"
        alt="Craft workshop banner"
        className="w-full h-full object-cover"
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/1000x192/333/fff?text=Forum+Banner'; }}
      />
      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-3xl md:text-4xl font-bold">
          Got questions or want to share your craft journey?
        </h1>
        <p className="mt-2 text-sm max-w-xl">
          Join the conversation, share tips, and connect with fellow creators.
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
