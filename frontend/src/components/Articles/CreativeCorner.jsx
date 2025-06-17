import React from 'react';
import InspirationHeader from './InspirationHeader';
import FeaturedArticles from './FeaturedArticles';
import LatestArticles from './LatestArticles';
import Footer from './Footer';
// Kita tidak perlu import SearchAndFilter lagi karena sudah menyatu di LatestArticles

const CreativeCorner = () => {
  return (
    // Latar belakang diubah agar sesuai dengan desain baru
    <div className="bg-[#FFF7ED] text-[#3B3021]">
      <InspirationHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold tracking-wide mb-6">FEATURED ARTICLES</h2>
        <FeaturedArticles />

        {/* Bagian Latest Articles sekarang mandiri */}
        <div className="mt-16">
          <LatestArticles />
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default CreativeCorner;
