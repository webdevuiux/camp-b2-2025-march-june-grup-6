import React from "react";

const CategorySection = ({
  className = "",
  title,
  categories,
  onCategoryClick = () => {},
}) => {
  const scrollLeft = () => {
    const container = document.getElementById("category-container");
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("category-container");
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className={`${className} max-md:px-2.5`}>
      <h2 className="text-black text-4xl font-bold ml-[90px] mt-[55px] max-md:ml-2.5 max-md:mt-10 max-md:text-2xl">
        {title}
      </h2>

      <div className="flex w-full max-w-[1248px] items-center gap-[18px] justify-start flex-nowrap overflow-x-auto scroll-smooth max-md:px-2.5">
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="cursor-pointer hover:opacity-75 transition-opacity max-md:mb-2 focus:outline-none"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/7278fbf29d9071329e988c287a5b507cc57b9760"
            alt="Scroll left"
            className="aspect-[0.5] object-contain w-[26px] self-stretch shrink-0 my-auto max-md:w-5"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/26x52"; // Fallback image
            }}
          />
        </button>

        <div
          id="category-container"
          className="overflow-x-auto self-stretch flex items-stretch gap-5 overflow-hidden w-[1160px] my-auto max-md:max-w-full max-md:w-full max-md:gap-2 touch-action-pan-x scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch", // Smooth scrolling on iOS
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="items-stretch rounded shadow-[5px_5px_10px_0px_rgba(0,0,0,0.25)] flex min-h-[150px] min-w-[275px] flex-col text-base text-[#FCEDDA] font-semibold whitespace-nowrap text-center justify-center bg-black py-[33px] cursor-pointer hover:bg-opacity-80 transition-colors max-md:min-h-[100px] max-md:min-w-[150px] max-md:py-2 snap-start"
            >
              <div className="flex max-w-full w-[275px] flex-col items-stretch max-md:w-[150px]">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="aspect-[1] object-contain w-[60px] self-center max-md:w-10"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/60"; // Fallback image
                  }}
                />
                <div className="text-[#FCEDDA] mt-2 max-md:text-sm">
                  {category.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="cursor-pointer hover:opacity-75 transition-opacity max-md:mt-2 focus:outline-none"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/2a7a961f04c9ffd8177812a784acb2e736410459"
            alt="Scroll right"
            className="aspect-[0.5] object-contain w-[26px] self-stretch shrink-0 my-auto max-md:w-5"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/26x52"; // Fallback image
            }}
          />
        </button>
      </div>

      {/* Tambahkan CSS untuk menyembunyikan scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none; 
        }
        .touch-action-pan-x {
          touch-action: pan-x;
        }
      `}</style>
    </section>
  );
};

export default CategorySection;