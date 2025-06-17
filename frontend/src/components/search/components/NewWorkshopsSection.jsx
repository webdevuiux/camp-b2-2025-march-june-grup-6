import React, { useState, useEffect } from "react";
import WorkshopCard from "./WorkshopCard";

const NewWorkshopsSection = ({
  className = "",
  title,
  location,
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
        const currentDate = new Date(); // 02:54 PM WIB, 16 Juni 2025
        // console.log("Current Date:", currentDate); // Debug

        // Mapping dan filter berdasarkan tanggal asli
        const mappedWorkshops = data
          .map((workshop) => {
            const workshopDate = new Date(workshop.date); // Parse tanggal asli
            // console.log(
            //   "Workshop Date (raw):",
            //   workshopDate,
            //   "Title:",
            //   workshop.topic
            // ); // Debug
            return {
              id: workshop.id,
              title: workshop.topic,
              organizer: workshop.host,
              description: workshop.description,
              location: workshop.location,
              date: workshopDate, // Simpan sebagai Date object
              rating: 0,
              participants: workshop.participants || workshop.quantity,
              imageUrl: workshop.image_url,
              isFavorite: false,
              profileImage: workshop.profile_image || null,
            };
          })
          .filter((workshop) => workshop.date >= currentDate); // Filter tanggal >= 16 Juni 2025

        // Konversi date ke string untuk tampilan setelah filter
        const formattedWorkshops = mappedWorkshops.map((workshop) => ({
          ...workshop,
          date: workshop.date.toLocaleDateString("en-GB"),
        }));

        setWorkshops(formattedWorkshops);
      } catch (error) {
        console.error("Error fetching approved workshops:", error);
        setWorkshops([]); // Set ke array kosong jika gagal fetch
      }
    };

    fetchApprovedWorkshops();
  }, [API_BASE_URL]);

  const scrollLeft = () => {
    const container = document.getElementById("new-workshops-container");
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("new-workshops-container");
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className={`${className}`}>
      <h2 className="text-black text-4xl font-bold ml-[90px] mt-10 max-md:max-w-full">
        {title}
      </h2>
      <div className="flex w-full max-w-[1252px] items-center gap-6 justify-between flex-wrap mt-[38px] max-md:max-w-full">
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="cursor-pointer hover:opacity-75 transition-opacity"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/0f1e14ada146973e15d8f8eb0720cc1946bd5c1c"
            alt="Scroll left"
            className="aspect-[0.49] object-contain w-[26px] self-stretch shrink-0 my-auto"
          />
        </button>
        <div
          id="new-workshops-container"
          className="overflow-x-auto self-stretch flex min-w-60 items-stretch gap-[30px] overflow-hidden w-[1151px] my-auto max-md:max-w-full"
        >
          {workshops.length > 0 ? (
            workshops.map((workshop) => (
              <div key={workshop.id} className="min-h-80 max-md:max-w-full">
                <WorkshopCard
                  workshop={workshop}
                  variant="vertical"
                  onJoin={onJoin}
                  onToggleFavorite={onToggleFavorite}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              There are no new workshops yet
            </p>
          )}
        </div>
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="cursor-pointer hover:opacity-75 transition-opacity"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/6e814d2ab891cca74bd66dffc2fb21200be2cbb8"
            alt="Scroll right"
            className="aspect-[0.51] object-contain w-[27px] self-stretch shrink-0 my-auto"
          />
        </button>
      </div>
    </section>
  );
};

export default NewWorkshopsSection;
