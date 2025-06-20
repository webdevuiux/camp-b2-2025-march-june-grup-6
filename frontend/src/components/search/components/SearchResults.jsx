import React, { useState, useEffect } from "react";
import WorkshopCard from "./WorkshopCard";

const SearchResults = ({
  className = "",
  results: initialResults = [],
  searchQuery = "",
  searchLocation = "",
  activeFilters = {},
  onJoin = () => {},
  onToggleFavorite = () => {},
  onViewMore = () => {},
}) => {
  const [results, setResults] = useState(initialResults);
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const normalizeCategory = (category) => {
    if (!category) return "unknown";
    return category.toLowerCase().replace(/ & /g, "").replace(/\s+/g, "");
  };

  // Fungsi untuk memetakan kategori berdasarkan topic atau description sebagai cadangan
  const mapCategory = (topic = "", description = "") => {
    const text = (topic + " " + description).toLowerCase();
    if (
      text.includes("paint") ||
      text.includes("watercolor") ||
      text.includes("acrylic") ||
      text.includes("oil painting")
    ) {
      return "painting";
    } else if (
      text.includes("pottery") ||
      text.includes("clay") ||
      text.includes("ceramic") ||
      text.includes("ceramics")
    ) {
      return "pottery";
    } else if (
      text.includes("textile") ||
      text.includes("fabric") ||
      text.includes("weaving") ||
      text.includes("sewing")
    ) {
      return "textile";
    } else if (
      text.includes("music") ||
      text.includes("guitar") ||
      text.includes("piano") ||
      text.includes("singing")
    ) {
      return "music";
    } else if (
      text.includes("lifestyle") ||
      text.includes("home") ||
      text.includes("decor") ||
      text.includes("organization")
    ) {
      return "lifestyle";
    } else if (
      text.includes("art") ||
      text.includes("design") ||
      text.includes("illustration") ||
      text.includes("graphic")
    ) {
      return "artdesign";
    } else if (
      text.includes("food") ||
      text.includes("drink") ||
      text.includes("cooking") ||
      text.includes("baking") ||
      text.includes("cooking class")
    ) {
      return "fooddrink";
    } else if (
      text.includes("business") ||
      text.includes("career") ||
      text.includes("entrepreneur") ||
      text.includes("leadership")
    ) {
      return "businesscareer";
    }
    console.warn(
      `Kategori tidak ditemukan untuk topic: "${topic}", description: "${description}"`
    );
    return "unknown";
  };
  const mapPricing = (workshop) => {
    const price = workshop.price ? parseFloat(workshop.price) : 0;
    const pricing = price > 0 ? "paid" : "free";
    // console.log(
    //   `Workshop ID: ${workshop.id}, Price: ${workshop.price}, Pricing: ${pricing}`
    // );
    return pricing;
  };

  useEffect(() => {
    const fetchApprovedWorkshops = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/workshops/approved-for-users`,
          {
            headers: {},
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch approved workshops");
        }
        const data = await response.json();
        const currentDate = new Date();

        const mappedResults = data
          .map((workshop) => {
            let workshopDate = new Date(workshop.date);
            const category = workshop.category
              ? normalizeCategory(workshop.category)
              : mapCategory(workshop.topic, workshop.description);
            // // Log untuk memeriksa kategori dan pricing
            // console.log(
            //   `Workshop ID: ${workshop.id}, Topic: ${workshop.topic}, Category dari API: ${workshop.category}, Category akhir: ${category}`
            // );
            return {
              id: workshop.id,
              title: workshop.topic,
              organizer: workshop.host,
              description: workshop.description,
              location: workshop.location,
              date: workshopDate,
              rating: 0,
              participants: workshop.participants || workshop.quantity,
              imageUrl: workshop.image_url,
              isFavorite: false,
              profileImage: workshop.profile_image || null,
              category: category,
              pricing: mapPricing(workshop),
            };
          })
          .filter((workshop) => {
            return (
              !isNaN(workshop.date.getTime()) && workshop.date >= currentDate
            );
          })
          .map((workshop) => ({
            ...workshop,
            date: workshop.date.toLocaleDateString("en-GB"),
          }));

        const filteredResults = mappedResults.filter((workshop) => {
          const matchesQuery =
            searchQuery === "" ||
            workshop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            workshop.description
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          const matchesLocation =
            searchLocation === "" ||
            workshop.location
              .toLowerCase()
              .includes(searchLocation.toLowerCase());
          const matchesCategory =
            !activeFilters.categories ||
            activeFilters.categories.length === 0 ||
            activeFilters.categories.includes(workshop.category);
          const matchesPricing =
            !activeFilters.pricing ||
            activeFilters.pricing.length === 0 ||
            activeFilters.pricing.includes(workshop.pricing);
          // Log untuk memeriksa filter yang diterapkan
          // console.log(
          //   `Workshop ID: ${workshop.id}, Matches: Query=${matchesQuery}, Location=${matchesLocation}, Category=${matchesCategory}, Pricing=${matchesPricing}`
          // );
          return (
            matchesQuery && matchesLocation && matchesCategory && matchesPricing
          );
        });

        // console.log("Hasil filter:", filteredResults);
        setResults(filteredResults);
      } catch (error) {
        console.error("Error fetching approved workshops:", error);
        setResults([]);
      }
    };

    fetchApprovedWorkshops();
  }, [API_BASE_URL, searchQuery, searchLocation, activeFilters]);

  return (
    <div
      className={`flex w-full flex-col items-stretch mt-1.5 max-md:max-w-full max-md:mt-2 ${className}`}
    >
      <div className="text-black text-sm font-normal max-md:text-xs">
        <span className="font-extrabold">{results.length}</span> results found
      </div>
      <div className="flex flex-col gap-5 mt-[15px] max-md:max-w-full max-md:gap-2 max-md:mt-2">
        {results.length > 0 ? (
          results.map((workshop) => (
            <WorkshopCard
              key={workshop.id}
              workshop={workshop}
              onJoin={onJoin}
              onToggleFavorite={onToggleFavorite}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 max-md:text-sm">
            There are no workshop recommendations yet
          </p>
        )}
      </div>
      {results.length > 0 && (
        <button
          onClick={onViewMore}
          className="text-[#FCEDDA] min-h-[35px] gap-[5px] text-base font-normal bg-[#FF5126] mt-5 px-2.5 py-1.5 hover:bg-opacity-80 transition-colors max-md:mt-2 max-md:text-sm"
        >
          View More
        </button>
      )}
    </div>
  );
};

export default SearchResults;