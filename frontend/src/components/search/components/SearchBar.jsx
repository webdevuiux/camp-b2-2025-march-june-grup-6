import React, { useState } from "react";

const SearchBar = ({ className = "", onSearch = () => {} }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState(""); // Kosongkan default location

  const handleSearch = () => {
    onSearch(searchQuery, location);
  };

  return (
    <div
      className={`items-stretch flex min-h-[60px] w-full max-w-[800px] flex-col justify-center bg-[#FEE4C4] py-1.5 rounded-lg ${className}`}
    >
      <div className="flex w-full max-w-[784px] items-center gap-[40px_100px] justify-between flex-wrap max-md:max-w-full">
        <div className="self-stretch flex items-center gap-[15px] my-auto">
          <div className="self-stretch flex items-center w-12 my-auto">
            <div className="self-stretch flex min-h-12 w-12 flex-col items-center justify-center my-auto">
              <div className="flex w-full max-w-10 items-center gap-2.5 overflow-hidden justify-center rounded-[100px]">
                <div className="self-stretch flex w-10 items-center gap-2.5 justify-center my-auto p-2">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/16674dde6e5312d20d5e8e175a17532d04c5497e"
                    alt="Search icon"
                    className="aspect-[1] object-contain w-6 self-stretch my-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="Cari Workshop"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="text-[rgba(121,121,121,1)] text-[15px] font-medium self-stretch my-auto bg-transparent outline-none"
          />
        </div>
        <div className="self-stretch flex min-w-60 items-center gap-[23px] font-normal my-auto">
          <div className="self-stretch flex items-center gap-[15px] text-xs text-black my-auto">
            <div className="border self-stretch w-0 shrink-0 h-[35px] my-auto border-[rgba(69,69,69,1)] border-solid" />
            <div className="self-stretch flex items-center gap-[5px] my-auto">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/81eed7be6c88804f523f3c893dfe771a45f9ebc5"
                alt="Location"
                className="aspect-[1] object-contain w-[26px] self-stretch shrink-0 my-auto"
              />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="self-stretch my-auto bg-transparent outline-none"
              >
                <option value="">Pilih Lokasi</option>
                <option value="Jakarta, Indonesia">Jakarta, Indonesia</option>
                <option value="Bali, Indonesia">Bali, Indonesia</option>
                <option value="Yogyakarta, Indonesia">
                  Yogyakarta, Indonesia
                </option>
                <option value="Bandung, Indonesia">Bandung, Indonesia</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="text-[#F7F7F7] self-stretch min-h-[35px] gap-[5px] text-base whitespace-nowrap w-[120px] bg-black my-auto px-2.5 py-1.5 hover:bg-opacity-80 transition-colors"
          >
            Cari
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
