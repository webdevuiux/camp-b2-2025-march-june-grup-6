import React from 'react';
import { Link } from 'react-router-dom';
import { articles } from '../../data/articles'; 

// --- Komponen Ikon ---
const BookmarkIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
        <path d="M17 3H7C5.89543 3 5 3.89543 5 5V21L12 18L19 21V5C19 3.89543 18.1046 3 17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);
const AuthorIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
);
const DateIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

// --- Komponen Pagination dengan Gaya Baru ---
const Pagination = () => (
    <div className="col-span-full flex justify-center items-center mt-12 text-sm font-medium text-gray-500">
        <button className="px-4 py-2 hover:text-black">← Previous</button>
        <button className="w-8 h-8 flex items-center justify-center bg-[#D94A27] text-white rounded-full mx-1">1</button>
        <button className="w-8 h-8 flex items-center justify-center hover:text-black mx-1">2</button>
        <button className="w-8 h-8 flex items-center justify-center hover:text-black mx-1">3</button>
        <span className="px-4 py-2">...</span>
        <button className="w-8 h-8 flex items-center justify-center hover:text-black mx-1">68</button>
        <button className="px-4 py-2 hover:text-black">Next →</button>
    </div>
);


const LatestArticles = () => {
  return (
    <section>
        {/* Judul dan Baris Filter/Search */}
        <h2 className="text-2xl font-bold tracking-wide mb-6">LATEST ARTICLES</h2>
        <div className="flex justify-between items-center mb-8">
            <button className="flex items-center border border-gray-400 rounded-md px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M3 10h12M3 16h6" /></svg>
                FILTERS
            </button>
            <div className="flex items-center">
                <input type="text" placeholder="Search Text" className="bg-[#FFEEDB] border-none rounded-l-md px-4 py-2 focus:ring-0 focus:outline-none w-64 placeholder-gray-500 text-sm"/>
                <button className="bg-[#3B3021] text-white px-6 py-2 rounded-r-md text-sm font-semibold">Search</button>
            </div>
        </div>

        {/* Kisi Artikel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
                <Link 
                    key={article.slug} 
                    to={`/articles/detail/${article.slug}`} 
                    className="group"
                >
                    {/* Menggunakan warna kartu krem gelap seperti yang diminta */}
                    <div className="bg-[#FFEEDB] rounded-lg p-3 h-full flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                            <img src={article.image} alt={article.title} className="rounded-md w-full h-52 object-cover" />
                            <div className="absolute top-3 right-3 bg-black/30 backdrop-blur-sm rounded-md p-1.5 cursor-pointer">
                                <BookmarkIcon />
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col flex-grow">
                            <h4 className="text-lg font-bold text-[#3B3021] flex-grow group-hover:text-[#D94A27] transition-colors">{article.title}</h4>
                            <div className="flex justify-between text-xs text-gray-500 mt-3">
                                <div className="flex items-center">
                                    <AuthorIcon />
                                    <span>{article.author}</span>
                                </div>
                                <div className="flex items-center">
                                    <DateIcon />
                                    <span>{article.date}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
      <Pagination />
    </section>
  );
};

export default LatestArticles;