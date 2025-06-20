import React, { useState } from "react";
import SearchHeader from "../components/SearchHeader";
import TiketKaryaLogo from "../components/TiketKaryaLogo";
import SearchBar from "../components/SearchBar";
import FilterSidebar from "../components/FilterSidebar";
import SearchResults from "../components/SearchResults";
import CategorySection from "../components/CategorySection";
import RecommendedSection from "../components/RecommendedSection";
import NewWorkshopsSection from "../components/NewWorkshopsSection";
import Footer from "../components/Footer";
import WorkshopCard from "../components/WorkshopCard";


const Search_HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  const handleSearch = (query, location) => {
    setSearchQuery(query);
    setSearchLocation(location);
    console.log(`Searching for "${query}" in ${location}`);
  };

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    console.log("Applied filters:", filters);
  };

  const handleJoinWorkshop = (id) => {
    console.log(`Joining workshop ID: ${id}`);
  };

  const handleToggleFavorite = (id) => {
    console.log(`Toggling favorite for workshop ID: ${id}`);
  };

  const handleCategoryClick = (id) => {
    setActiveFilters((prev) => ({
      ...prev,
      categories: [id], // Set hanya kategori yang diklik
    }));
    console.log(`Selected category: ${id}`);
  };

  const categories = [
    {
      id: "painting",
      name: "Painting",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/638e2de19dd3f8d4a5f1f89915d51e1251e1f85d",
    },
    {
      id: "pottery",
      name: "Pottery",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/f18af712f7cc1ba75e07f00803760359e97717f3",
    },
    {
      id: "textile",
      name: "Textile & Fabric",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/a7c8b17afa8fc563952e0dbfe320a4bc2de396e9",
    },
    {
      id: "music",
      name: "Music",
      imageUrl:
        "https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/b40b7435b8e63e9c6d5652c928d93249a2e5d9a1",
    },
    {
      id: "lifestyle",
      name: "Lifestyle & Home",
      imageUrl: "/img/Logo2.png",
    },
    {
      id: "artdesign",
      name: "Art & Design",
      imageUrl: "/img/Logo1.png",
    },
    {
      id: "fooddrink",
      name: "Food & Drink",
      imageUrl: "/img/Logo4.png",
    },
    {
      id: "businesscareer",
      name: "Business & Career",
      imageUrl: "/img/Logo3.png",
    },
  ];

  return (
    <div className="bg-[#FCEDDA] pt-1.5 max-md:pt-1">
      <div className="flex w-full flex-col items-center px-[50px] max-md:max-w-full max-md:px-5">
        <SearchHeader />
        <TiketKaryaLogo />

        <SearchBar className="mt-[30px] max-md:mt-5" onSearch={handleSearch} />

        <div className="w-full max-w-[1205px] mt-[60px] max-md:max-w-full max-md:mt-10">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-2">
            {/* Sidebar Filter */}
            <div className="w-[24%] max-md:w-full max-md:ml-0">
              <FilterSidebar onApplyFilters={handleApplyFilters} />
            </div>

            {/* Search Results */}
            <div className="w-[76%] ml-5 max-md:w-full max-md:ml-0">
              <SearchResults
                searchQuery={searchQuery}
                searchLocation={searchLocation}
                activeFilters={activeFilters}
                onJoin={handleJoinWorkshop}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>
          </div>
        </div>

        <CategorySection
          title="Explore by category"
          categories={categories}
          onCategoryClick={handleCategoryClick}
          className="max-md:mt-5"
        />

        <RecommendedSection
          title="Recommended for You"
          onJoin={handleJoinWorkshop}
          onToggleFavorite={handleToggleFavorite}
          className="max-md:mt-5"
        />

        <NewWorkshopsSection
          title="New Workshops in Your Area"
          location={searchLocation}
          onJoin={handleJoinWorkshop}
          onToggleFavorite={handleToggleFavorite}
          className="max-md:mt-5"
        />
      </div>

      <Footer className="max-md:mt-5" />
    </div>
  );
};

export default Search_HomePage;