import React, { useState, useEffect } from 'react';

// --- Komponen Ikon Media Sosial ---
// Saya menggunakan gambar dari Wikimedia untuk contoh. Anda bisa menggantinya dengan ikon SVG Anda sendiri.
const LinkedInIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" alt="LinkedIn" className="w-10 h-10 rounded-md" />;
const FacebookIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-10 h-10 rounded-md" />;
const XIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/X_logo_2023_%28white%29.png" alt="X" className="w-10 h-10 p-1 bg-black rounded-md" />;
const InstagramIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-10 h-10 rounded-md" />;
const TelegramIcon = () => <img src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" alt="Telegram" className="w-10 h-10 rounded-md" />;

const ShareArticle = ({ articleUrl, articleTitle, onClose }) => {
  const [copySuccess, setCopySuccess] = useState('');

  // Fungsi untuk menyalin link ke clipboard
  const copyToClipboard = () => {
    // navigator.clipboard.writeText(articleUrl) mungkin tidak bekerja di semua browser/iframe
    // Kita gunakan cara yang lebih kompatibel.
    const textArea = document.createElement("textarea");
    textArea.value = articleUrl;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed!');
    }
    document.body.removeChild(textArea);
    setTimeout(() => setCopySuccess(''), 2000); // Reset pesan setelah 2 detik
  };

  // URL untuk berbagi ke media sosial
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(articleTitle);
  const shareLinks = {
    linkedin: 'https://www.linkedin.com/in/hasbul-ihza-firnanda-az',
    facebook: 'https://www.facebook.com/share/1BvgLxgVnQ/',
    twitter: 'https://x.com/yourcrush9072?s=21&t=TXn6xYKK6426ZsHyijI5SQ',
    telegram: 'https://t.me/hasbulajah',
    instagram: 'https://www.instagram.com/hasbulfirnanda92?igsh=MWVmN21rZG96aG1pdg==',
    
  };
  
  return (
    // Latar belakang gelap transparan (overlay)
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Menutup modal jika area luar diklik
    >
      {/* Konten Modal */}
      <div 
        className="bg-[#FFF7ED] p-6 rounded-lg shadow-xl w-full max-w-md"
        onClick={e => e.stopPropagation()} // Mencegah klik di dalam modal menutup modal
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#3B3021]">Share this article</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer"><LinkedInIcon /></a>
          <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
          <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer"><XIcon /></a>
          <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
          <a href={shareLinks.telegram} target="_blank" rel="noopener noreferrer"><TelegramIcon /></a>
        </div>

        <div>
          <label className="text-sm font-semibold text-[#3B3021] mb-2 block">Share this link</label>
          <div className="flex">
            <input 
              type="text" 
              readOnly 
              value={articleUrl} 
              className="w-full bg-white border border-gray-300 rounded-l-md px-3 py-2 focus:ring-0 focus:outline-none text-sm text-gray-600"
            />
            <button 
              onClick={copyToClipboard}
              className="bg-[#3B3021] text-white px-4 py-2 rounded-r-md text-sm font-semibold whitespace-nowrap"
            >
              {copySuccess || 'Copy Link'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareArticle;
