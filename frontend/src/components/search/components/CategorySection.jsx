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
    <section className={`${className}`}>
      <h2 className="text-black text-4xl font-bold ml-[90px] mt-[55px] max-md:ml-2.5 max-md:mt-10">
        {title}
      </h2>

      <div className="flex w-full max-w-[1248px] items-center gap-[18px] justify-between flex-wrap mt-[42px] max-md:max-w-full max-md:mt-10">
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="cursor-pointer hover:opacity-75 transition-opacity"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/7278fbf29d9071329e988c287a5b507cc57b9760"
            alt="Scroll left"
            className="aspect-[0.5] object-contain w-[26px] self-stretch shrink-0 my-auto"
          />
        </button>

        <div
          id="category-container"
          className="overflow-x-auto self-stretch flex min-w-60 items-stretch gap-5 overflow-hidden w-[1160px] my-auto max-md:max-w-full"
        >
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => onCategoryClick(category.id)}
              className="items-stretch rounded shadow-[5px_5px_10px_0px_rgba(0,0,0,0.25)] flex min-h-[150px] flex-col text-base text-[#FCEDDA] font-semibold whitespace-nowrap text-center justify-center bg-black py-[33px] cursor-pointer hover:bg-opacity-80 transition-colors"
            >
              <div className="flex max-w-full w-[275px] flex-col items-stretch">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="aspect-[1] object-contain w-[60px] self-center"
                />
                <div className="text-[#FCEDDA] mt-2">{category.name}</div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="cursor-pointer hover:opacity-75 transition-opacity"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/2a7a961f04c9ffd8177812a784acb2e736410459"
            alt="Scroll right"
            className="aspect-[0.5] object-contain w-[26px] self-stretch shrink-0 my-auto"
          />
        </button>
      </div>
    </section>
  );
};

export default CategorySection;
