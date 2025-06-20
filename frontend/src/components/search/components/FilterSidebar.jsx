// File: FilterSidebar.jsx
import React, { useState } from "react";

const FilterSidebar = ({ className = "", onApplyFilters = () => {} }) => {
  const [categoryFilters, setCategoryFilters] = useState([
    { id: "painting", label: "Painting", checked: false },
    { id: "pottery", label: "Pottery", checked: false },
    { id: "textile", label: "Textile & Fabric", checked: false },
    { id: "music", label: "Music", checked: false },
    { id: "lifestyle", label: "Lifestyle & Home", checked: false },
    { id: "artdesign", label: "Art & Design", checked: false },
    { id: "fooddrink", label: "Food & Drink", checked: false },
    { id: "businesscareer", label: "Business & Career", checked: false },
  ]);

  const [pricingFilters, setPricingFilters] = useState([
    { id: "paid", label: "Paid", checked: true },
    { id: "free", label: "Free", checked: false },
  ]);

  const [typeFilters, setTypeFilters] = useState([
    { id: "offline", label: "Offline", checked: false },
    { id: "online", label: "Online", checked: false },
    { id: "hybrid", label: "Offline - Online", checked: true },
  ]);

  const [languageFilters, setLanguageFilters] = useState([
    { id: "bahasa", label: "Bahasa Indonesia", checked: true },
    { id: "english", label: "English", checked: false },
  ]);

  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const toggleFilter = (filterId, filterType) => {
    switch (filterType) {
      case "category":
        setCategoryFilters((prev) =>
          prev.map((filter) =>
            filter.id === filterId
              ? { ...filter, checked: !filter.checked }
              : filter
          )
        );
        break;
      case "pricing":
        setPricingFilters((prev) =>
          prev.map((filter) =>
            filter.id === filterId
              ? { ...filter, checked: !filter.checked }
              : filter
          )
        );
        break;
      case "type":
        setTypeFilters((prev) =>
          prev.map((filter) =>
            filter.id === filterId
              ? { ...filter, checked: !filter.checked }
              : filter
          )
        );
        break;
      case "language":
        setLanguageFilters((prev) =>
          prev.map((filter) =>
            filter.id === filterId
              ? { ...filter, checked: !filter.checked }
              : filter
          )
        );
        break;
    }
  };

  const handleApplyFilters = () => {
    const filters = {
      categories: categoryFilters.filter((f) => f.checked).map((f) => f.id),
      pricing: pricingFilters.filter((f) => f.checked).map((f) => f.id),
      types: typeFilters.filter((f) => f.checked).map((f) => f.id),
      languages: languageFilters.filter((f) => f.checked).map((f) => f.id),
    };
    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setCategoryFilters((prev) =>
      prev.map((filter) => ({ ...filter, checked: false }))
    );
    setPricingFilters((prev) =>
      prev.map((filter) => ({ ...filter, checked: false }))
    );
    setTypeFilters((prev) =>
      prev.map((filter) => ({ ...filter, checked: false }))
    );
    setLanguageFilters((prev) =>
      prev.map((filter) => ({ ...filter, checked: false }))
    );
  };

  const FilterCheckbox = ({ filter, type }) => (
    <label
      key={filter.id}
      className="flex items-center gap-[15px] cursor-pointer max-md:gap-1"
    >
      <img
        src={
          filter.checked
            ? "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/f5ef329dfeb10c892d71980f82a8a2095dcf81f9"
            : "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/7226dc466f03c33990089bfb998d59d72f5e2f2e"
        }
        alt={filter.checked ? "Selected" : "Not selected"}
        className="aspect-[1] object-contain w-[25px] shrink-0 max-md:w-4"
      />
      <span
        className="grow shrink w-[108px] max-md:w-[80px] max-md:text-sm"
        onClick={() => toggleFilter(filter.id, type)}
      >
        {filter.label}
      </span>
    </label>
  );

  return (
    <aside
      className={`items-center flex min-h-[774px] gap-2.5 w-full bg-[#FEE4C4] px-[9px] py-[18px] rounded-[15px] ${className} max-md:min-h-[500px] max-md:px-2 max-md:py-4`}
    >
      <div className="self-stretch flex min-w-60 w-[261px] flex-col items-stretch justify-center my-auto max-md:w-full max-md:max-w-[200px]">
        <div className="w-full text-xl text-black font-bold whitespace-nowrap tracking-[0.6px] max-md:text-lg">
          <h2>Filter</h2>
          <div className="border min-h-px w-full mt-1.5 border-black border-solid" />
        </div>

        {/* Category Section */}
        <div className="w-full text-black mt-2.5 max-md:mt-1">
          <div className="w-[148px] max-w-full max-md:w-[120px]">
            <div className="w-full whitespace-nowrap">
              <h3 className="text-base font-bold max-md:text-sm">Category</h3>
              <div className="flex w-full gap-[15px_10px] text-sm font-normal flex-wrap mt-[15px] max-md:gap-1 max-md:text-xs">
                {categoryFilters
                  .slice(0, showMoreCategories ? undefined : 4)
                  .map((filter) => (
                    <FilterCheckbox
                      key={filter.id}
                      filter={filter}
                      type="category"
                    />
                  ))}
              </div>
            </div>
            <button
              className="text-xs font-normal mt-[15px] hover:opacity-75 transition-opacity max-md:text-xs max-md:mt-1"
              onClick={() => setShowMoreCategories(!showMoreCategories)}
            >
              {showMoreCategories ? "Show Less" : "Show More"}
            </button>
          </div>
          <div className="border min-h-px w-full mt-2.5 border-black border-solid" />
        </div>

        {/* Pricing Section */}
        <div className="w-full text-black whitespace-nowrap mt-2.5 max-md:mt-1">
          <div className="w-[226px] max-w-full max-md:w-[180px]">
            <h3 className="text-base font-bold max-md:text-sm">Pricing</h3>
            <div className="flex w-full items-center gap-[30px] text-sm font-normal mt-[15px] max-md:gap-2 max-md:text-xs">
              {pricingFilters.map((filter) => (
                <FilterCheckbox
                  key={filter.id}
                  filter={filter}
                  type="pricing"
                />
              ))}
            </div>
          </div>
          <div className="border min-h-px w-full mt-[15px] border-black border-solid" />
        </div>

        {/* Type Section */}
        <div className="w-full text-black mt-2.5 max-md:mt-1">
          <div className="w-[148px] max-w-full max-md:w-[120px]">
            <h3 className="text-base font-bold max-md:text-sm">Type</h3>
            <div className="flex w-full items-center gap-[15px_10px] text-sm font-normal justify-center flex-wrap mt-[15px] max-md:gap-1 max-md:text-xs">
              {typeFilters.map((filter) => (
                <FilterCheckbox key={filter.id} filter={filter} type="type" />
              ))}
            </div>
          </div>
          <div className="border min-h-px w-full mt-[15px] border-black border-solid" />
        </div>

        {/* Language Section */}
        <div className="w-full text-black mt-2.5 max-md:mt-1">
          <h3 className="text-base font-bold max-md:text-sm">Language</h3>
          <div className="w-full text-sm font-normal mt-[15px] max-md:text-xs">
            <div className="flex w-[148px] max-w-full items-center gap-[15px_10px] justify-center flex-wrap max-md:gap-1">
              {languageFilters.map((filter) => (
                <FilterCheckbox
                  key={filter.id}
                  filter={filter}
                  type="language"
                />
              ))}
            </div>
            <div className="border min-h-px w-full mt-[15px] border-black border-solid" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full items-center gap-[17px] text-base font-normal whitespace-nowrap mt-2.5 max-md:gap-1 max-md:text-sm">
          <button
            onClick={handleClearFilters}
            className="text-[rgba(2,2,2,1)] self-stretch w-[120px] my-auto hover:opacity-75 transition-opacity max-md:w-[100px]"
          >
            Clear
          </button>
          <button
            onClick={handleApplyFilters}
            className="self-stretch bg-[rgba(41,41,41,1)] min-h-[35px] gap-2.5 text-white w-[120px] my-auto py-1.5 hover:bg-opacity-80 transition-colors max-md:w-[100px] max-md:text-sm"
          >
            Apply
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;