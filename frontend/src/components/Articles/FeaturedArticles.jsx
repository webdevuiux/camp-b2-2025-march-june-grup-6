import React from 'react';
// 1. Tambahan Link dari react-router-dom
import { Link } from 'react-router-dom';

const featuredData = [
  {
    slug: "discover-the-timeless-art-of-pottery",
    title: "Discover the Timeless Art of Pottery",
    excerpt: "A world away from mass fast culture lies depth, warmth and clay molded by hand into beautiful shapes.",
    date: "June 3, 2025",
    image: "/img/articles/pottery.jpg",
  },
  {
    slug: "the-art-of-collaboration",
    title: "The Art of Collaboration: Why Creating Together Matters",
    author: "Indira Wahyuni",
    date: "June 3, 2025",
    image: "/img/articles/collaboration.jpg",
  },
  {
    slug: "textile-traditions-modern-creators",
    title: "Textile Traditions: How Modern Creators Honor Heritage",
    author: "Putri Andriani",
    date: "June 3, 2025",
    image: "/img/articles/Textile.jpg",
  },
  {
    slug: "5-diy-crafts-you-can-start",
    title: "5 DIY Crafts You Can Start This Weekend",
    author: "Rina Kusuman",
    date: "June 3, 2025",
    image: "/img/articles/DIY.jpg",
  }
]

const FeaturedArticles = () => {
  const mainArticle = featuredData[0];
  const sideArticles = featuredData.slice(1);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      {/* Main Featured Article */}
      {/* 3. Bungkus div utama dengan Link */}
      <Link to={`/articles/detail/${mainArticle.slug}`} className="group block h-full">
        <div className="bg-[#FFEEDB] p-4 rounded-lg shadow-md flex flex-col h-full cursor-pointer hover:shadow-xl transition-shadow duration-300">
          <img src={mainArticle.image} alt={mainArticle.title} className="rounded-md w-full h-80 object-cover" />
          <div className="mt-4 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-[#3B3021] group-hover:text-[#D94A27] transition-colors">
              {mainArticle.title}
            </h3>
            <p className="text-md my-2 text-gray-800 flex-grow">
              {mainArticle.excerpt}
            </p>
            <div className="text-sm text-gray-500 mt-2">
              {mainArticle.date}
            </div>
          </div>
        </div>
      </Link>

      {/* Side Articles */}
      <div className="flex flex-col gap-4">
        {sideArticles.map((article) => (
          // 4. Bungkus setiap div sampingan dengan Link
          <Link key={article.slug} to={`/articles/detail/${article.slug}`} className="group block">
            <div className="flex items-center gap-4 bg-[#FFEEDB] p-3 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition-shadow duration-300">
              <img src={article.image} alt={article.title} className="w-32 h-24 rounded-md object-cover" />
              <div className="flex-grow">
                <h4 className="font-bold text-md text-[#3B3021] leading-tight group-hover:text-[#D94A27] transition-colors">
                   {article.title}
                </h4>
                <div className="text-xs text-gray-500 mt-2">
                   {article.author} • {article.date}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default FeaturedArticles;
