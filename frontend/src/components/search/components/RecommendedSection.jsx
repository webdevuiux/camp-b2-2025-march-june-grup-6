import React, { useState, useEffect } from "react";
import WorkshopCard from "./WorkshopCard";

const RecommendedSection = ({
  className = "",
  title,
  workshops: initialWorkshops = [],
  onJoin = () => {},
  onToggleFavorite = () => {},
}) => {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

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
        // console.log("Current Date:", currentDate); // Debug

        // Mapping dan fetch rating secara paralel
        const workshopPromises = data.map(async (workshop) => {
          const workshopData = {
            id: workshop.id,
            title: workshop.topic,
            organizer: workshop.host,
            description: workshop.description,
            location: workshop.location,
            date: new Date(workshop.date), // Simpan sebagai Date object
            rating: 0,
            participants: workshop.participants || workshop.quantity,
            imageUrl: workshop.image_url,
            isFavorite: false,
            profileImage: workshop.profile_image || null,
          };
          // Fetch rating
          try {
            const ratingResponse = await fetch(
              `${API_BASE_URL}/api/reviews/workshops/${workshop.id}/reviews`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            if (ratingResponse.ok) {
              const ratingData = await ratingResponse.json();
              if (ratingData.length > 0) {
                const totalRating = ratingData.reduce(
                  (sum, review) => sum + (review.rating || 0),
                  0
                );
                workshopData.rating = (totalRating / ratingData.length).toFixed(
                  1
                );
              }
            }
          } catch (err) {
            console.error(
              `Error fetching rating for workshop ${workshop.id}:`,
              err
            );
          }
          // console.log(
          //   "Workshop Date (raw):",
          //   new Date(workshop.date),
          //   "Title:",
          //   workshop.topic
          // ); // Debug
          return workshopData;
        });

        // Tunggu semua promise selesai, lalu filter
        const mappedWorkshops = await Promise.all(workshopPromises);
        const filteredWorkshops = mappedWorkshops.filter((workshop) => {
          return workshop.date >= currentDate; // Filter berdasarkan Date object
        });

        // Urutkan berdasarkan rating tertinggi dan konversi date untuk tampilan
        const sortedWorkshops = filteredWorkshops
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .map((workshop) => ({
            ...workshop,
            date: workshop.date.toLocaleDateString("en-GB"), // Konversi setelah filter
          }));

        // Hapus duplikat berdasarkan id
        const uniqueWorkshops = Array.from(
          new Map(sortedWorkshops.map((item) => [item.id, item])).values()
        );
        setWorkshops(uniqueWorkshops);
      } catch (error) {
        console.error("Error fetching approved workshops:", error);
        setWorkshops([]); // Set ke array kosong jika gagal fetch
      }
    };

    fetchApprovedWorkshops();
  }, [API_BASE_URL]);

  const scrollLeft = () => {
    const container = document.getElementById("recommended-container");
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("recommended-container");
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className={`${className}`}>
      <h2 className="text-black text-4xl font-bold ml-[90px] mt-[52px] max-md:ml-2.5 max-md:mt-10">
        {title}
      </h2>
      <div className="flex w-full max-w-[1251px] items-center gap-[21px] justify-between flex-wrap mt-[42px] max-md:max-w-full max-md:mt-10">
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
          id="recommended-container"
          className="overflow-x-auto self-stretch flex min-w-60 items-stretch gap-[22px] overflow-hidden w-[1157px] my-auto max-md:max-w-full"
        >
          {workshops.length > 0 ? (
            workshops.map((workshop) => (
              <WorkshopCard
                key={workshop.id}
                workshop={workshop}
                variant="vertical"
                onJoin={onJoin}
                onToggleFavorite={onToggleFavorite}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">
              There are no workshop recommendations yet
            </p>
          )}
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

export default RecommendedSection;
