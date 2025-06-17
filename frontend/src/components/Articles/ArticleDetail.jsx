import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link untuk tombol back
import ShareArticle from './ShareArticle';   // Import komponen modal kita

const ArticleDetails = () => {
  // --- KODE BARU DIMULAI DI SINI ---
  // State untuk mengontrol visibilitas modal
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Dapatkan URL halaman saat ini untuk dibagikan
  const currentUrl = window.location.href;
  const articleTitle = "Discover the Timeless Art of Pottery: Shape Your Creativity with Clay";
  // --- KODE BARU SELESAI DI SINI ---

  return (
    <> {/* Tambahkan fragment untuk membungkus komponen utama dan modal */}
      <div className="min-h-screen p-6 max-w-4xl mx-auto bg-[#FEE4C4]">
        {/* Back Button (diubah menjadi Link agar berfungsi) */}
        <Link to="/articles" className="inline-block mb-4 px-3 py-1 bg-[#fff5cc] text-gray-800 font-semibold rounded">
          &larr; Back
        </Link>

        {/* Main Image */}
        <img
          src="/img/articles/post.jpg"
          alt="Pottery"
          className="w-full max-h-80 object-cover mb-6 rounded"
        />

        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <span className="text-orange-500 font-semibold">
              Pottery
            </span>
            <h1 className="text-2xl font-bold mt-2 mb-2">
              Discover the Timeless Art of Pottery: Shape Your Creativity with Clay
            </h1>
            <div className="flex items-center gap-2">
              {/* Gambar avatar penulis dan info penulis */}
              <img src="https://i.pravatar.cc/32" alt="Author" className="rounded-full w-8 h-8" />
              <span>By David</span>
              <span>June 5 2025</span>
              <span>0 Comments</span>
            </div>
          </div>

          {/* Tombol Share (diubah untuk membuka modal) */}
          <button 
            onClick={() => setIsShareModalOpen(true)}
            className="px-4 py-2 bg-gray-800 text-gray-100 font-semibold rounded"
          >
            SHARE
          </button>
        </div>

        {/* --- KONTEN ASLI ANDA YANG DIKEMBALIKAN --- */}
        <div className="mb-6">
          <p className="mb-4">
            In a world that moves fast and often feels digital, there's something grounding and deeply human about shaping clay with your bare hands. Pottery is more than just creating objects — it's a meditative journey, a form of self-expression, and a connection to centuries of artistic tradition.
          </p>

          <p className="mb-4">
            At TiketKarya, we celebrate creativity in all its forms, and pottery holds a special place in the heart of the creative ecosystem. Whether you’re a curious beginner or a seasoned crafter, our pottery programs are designed to spark inspiration, encourage experimentation, and let your creativity take shape — quite literally.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            Why Pottery?
          </h2>

          <p className="mb-4">
            Pottery invites you to slow down and focus. It teaches patience, precision, and the joy of imperfection. From forming your first bowl on the wheel to adding the final glaze, each step is a blend of technique and artistic intuition. It’s not just about what you make — it’s about what you feel while making it.
          </p>

          <ul className="list-disc ml-6 mb-4">
            <li>Hands-on Learning: Guided by experienced artists, you'll learn the foundational techniques of hand-building and wheel-throwing.</li>
            <li>All Materials Provided: Clay, tools, glazes, and even aprons — just bring yourself.</li>
            <li>Take-Home Art: You'll leave with a finished piece to cherish — a mug, bowl, plate or sculpture made with your own hands.</li>
            <li>Creative Community: Meet fellow makers, share stories, and be part of an inclusive creative space.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            A Craft for Everyone
          </h2>

          <p className="mb-4">
            You don't need to be an artist to enjoy pottery. You just need curiosity. Our programs welcome all ages and skill levels. Whether you’re looking for a calming weekend activity, a date idea, or a way to reconnect with your creative side, pottery is the perfect place to start.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">
            Join a Workshop Near You
          </h2>

          <p className="mb-4">
            Explore upcoming pottery classes on TiketKarya and book your spot easily through our intuitive platform. Multiple time slots, flexible payment options, and accessible locations mean there’s always a seat for you at the wheel.
          </p>
        </div>

        {/* Comment Section (KODE ASLI ANDA) */}
        <div className="mt-6">
          <div className="flex items-center mb-4">
            {/* Ikon dan points */}
            <span className="flex items-center gap-2 px-3 py-1 mr-4 bg-orange-500 text-gray-100 font-semibold rounded">
              +43 XPoints
            </span>
            {/* Title */}
            <h2 className="text-lg font-semibold">
              Leave a reply
            </h2>
          </div>

          <textarea
            placeholder="Write Here"
            className="w-full p-3 mb-4 border rounded-md"
            rows="5"
          ></textarea>

          <button className="px-4 py-2 w-full bg-gray-800 text-gray-100 font-semibold rounded">
            Post Comment
          </button>
        </div>
        {/* --- AKHIR DARI KODE ASLI ANDA --- */}
      </div>

      {/* --- KODE BARU DITAMBAHKAN DI LUAR DIV UTAMA --- */}
      {/* Tampilkan modal hanya jika isShareModalOpen adalah true */}
      {isShareModalOpen && (
        <ShareArticle 
          articleUrl={currentUrl} 
          articleTitle={articleTitle}
          onClose={() => setIsShareModalOpen(false)} 
        />
      )}
    </>
  );
};

export default ArticleDetails;
