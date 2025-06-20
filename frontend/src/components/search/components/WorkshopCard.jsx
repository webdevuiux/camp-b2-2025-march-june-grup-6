import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WorkshopCard = ({
  className = "",
  variant = "horizontal",
  workshop,
  onToggleFavorite = () => {},
}) => {
  const navigate = useNavigate();
  const {
    id,
    title,
    organizer,
    description,
    location,
    date,
    rating,
    participants,
    imageUrl,
    isFavorite = false,
    profileImage,
  } = workshop;

  const [averageRating, setAverageRating] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/reviews/workshops/${id}/reviews`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        if (data.length > 0) {
          const totalRating = data.reduce(
            (sum, review) => sum + (review.rating || 0),
            0
          );
          setAverageRating((totalRating / data.length).toFixed(1));
        } else {
          setAverageRating(null);
        }
      } catch (err) {
        setError(err.message);
        setAverageRating(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReviews();
    } else {
      setLoading(false);
      setAverageRating(null);
    }
  }, [id]);

  const handleJoin = () => {
    navigate(`/workshop-detail/${id}`);
  };

  if (variant === "horizontal") {
    return (
      <div
        className={`relative flex items-center ${className} max-md:flex-col max-md:items-stretch`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="aspect-[1.65] object-contain w-[380px] self-stretch z-0 min-w-60 my-auto max-md:w-full max-md:h-auto"
        />
        <div className="justify-center items-center self-stretch z-0 flex min-w-60 min-h-[230px] flex-col flex-1 shrink basis-[0%] bg-[#FEE4C4] my-auto px-[23px] py-9 max-md:max-w-full max-md:px-2 max-md:py-4 max-md:min-h-[150px]">
          <div className="w-full max-w-[461px] max-md:max-w-full">
            <div className="flex w-full gap-[40px_63px] max-md:max-w-full max-md:flex-col max-md:gap-2">
              <h3 className="text-black text-2xl font-bold leading-[1.2] tracking-[-1.2px] max-md:text-lg max-md:leading-[1.1]">
                {title}
              </h3>
              <div className="flex items-center gap-[5px] text-[11px] text-black font-normal whitespace-nowrap max-md:text-xs">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/acefdded7f7bad97c4b8fc75b82b6cf7d2eb9078"
                  alt="Rating"
                  className="aspect-[1] object-contain w-[17px] self-stretch shrink-0 my-auto"
                />
                <div className="self-stretch w-4 my-auto">
                  {loading
                    ? "..."
                    : averageRating !== null
                    ? averageRating
                    : "N/A"}
                </div>
              </div>
            </div>
            <div className="w-full mt-[5px] max-md:max-w-full">
              <div className="flex w-[165px] max-w-full items-stretch gap-1 text-xs text-black font-medium py-px max-md:w-[120px] max-md:text-xs">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt={`${organizer}'s profile`}
                    className="aspect-[1] object-contain w-4 shrink-0 mr-1 rounded-full"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/20";
                    }}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/20"
                    alt="Default profile"
                    className="aspect-[1] object-contain w-4 shrink-0 mr-1 rounded-full"
                  />
                )}
                <div className="grow shrink w-[142px] max-md:w-[100px]">
                  {organizer}
                </div>
              </div>
              {description && (
                <div className="w-full max-md:max-w-full">
                  <p className="self-stretch w-[376px] max-w-full gap-2.5 text-xs text-black font-normal leading-[18px] py-2.5 max-md:w-[200px] max-md:text-sm">
                    {description}
                  </p>
                </div>
              )}
              <div className="flex w-full gap-[40px_99px] mt-[5px] max-md:max-w-full max-md:flex-col max-md:gap-2">
                <div className="flex flex-col items-stretch text-xs text-black font-normal w-[157px] max-md:w-full">
                  <div className="flex w-full items-center gap-1">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/bb6f74dee326d72c34842d575f5f759b10b11214"
                      alt="Location"
                      className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                    />
                    <div className="self-stretch my-auto max-md:w-[100px]">
                      {location}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2.5">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/f984529142f769e5565a02218d3ecb8e42e1188a"
                      alt="Date"
                      className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto"
                    />
                    <div className="self-stretch w-[72px] my-auto max-md:w-[60px]">
                      {date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-[15px] max-md:flex-col max-md:gap-2">
                  <div className="justify-center items-center shadow-[5px_5px_10px_0px_rgba(0,0,0,0.25)] self-stretch flex min-h-[30px] gap-0.5 text-xs text-black font-normal w-[120px] bg-[#FCEDDA] my-auto px-2.5 py-1.5 rounded-[50px] max-md:w-[100px]">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/b4b7dc16946def7c86817ab6eb322bc3d1a67dd9"
                      alt="Participants"
                      className="aspect-[2.38] object-contain w-[38px] self-stretch shrink-0 gap-[-5px] my-auto"
                    />
                    <div className="text-black self-stretch my-auto max-md:text-sm">
                      {participants}
                    </div>
                  </div>
                  <button
                    onClick={handleJoin}
                    className="text-[#FCEDDA] self-stretch min-h-[30px] gap-2.5 text-[13px] font-medium whitespace-nowrap w-[70px] bg-[#FF5126] my-auto px-2.5 py-[5px] rounded-[50px] hover:bg-opacity-80 transition-colors max-md:w-[60px] max-md:text-sm"
                  >
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => onToggleFavorite(id)}
          className="absolute z-0 top-1.5 left-[343px] max-md:left-[10px] max-md:top-2"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/7d4878d94abdf3b84bec7836df592ae72590f35b"
            alt="Favorite"
            className="aspect-[1/1] object-contain w-[30px] shrink-0 h-[30px] max-md:w-5 max-md:h-5"
          />
        </button>
      </div>
    );
  }

  // Vertical card variant
  return (
    <div className={className}>
      <div className="flex flex-col relative aspect-[1.855] min-h-[200px] w-full gap-2.5 pt-1 pb-[166px] px-1 max-md:pb-[100px] max-md:min-h-[150px]">
        <img
          src={imageUrl}
          alt={title}
          className="absolute h-full w-full object-cover inset-0"
        />
        <button
          onClick={() => onToggleFavorite(id)}
          className="relative items-center rounded bg-[#FFDEB5] flex min-h-[30px] w-[30px] gap-2.5 h-[30px] p-[5px] max-md:w-5 max-md:h-5 max-md:p-1"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/8c5b03b4b46fe6de4216366577d5879a8e43364e"
            alt="Favorite"
            className="aspect-[1] object-contain w-5 self-stretch my-auto max-md:w-3"
          />
        </button>
      </div>
      <div className="flex min-h-[140px] w-full flex-col bg-[#FEE4C4] px-[11px] py-3 max-md:min-h-[100px] max-md:px-2 max-md:py-2">
        <h3 className="text-black self-stretch gap-2.5 text-2xl font-bold tracking-[-1.2px] leading-[1.2] max-md:text-lg">
          {title}
        </h3>
        <div className="flex w-full max-w-[345px] gap-[40px_71px] justify-between mt-2 max-md:max-w-full max-md:flex-col max-md:gap-1">
          <div className="flex flex-col items-stretch w-[234px] max-md:w-full">
            <div className="flex items-center gap-1 max-md:gap-0.5">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={`${organizer}'s profile`}
                  className="aspect-[1] object-contain w-4 shrink-0 mr-1 rounded-full max-md:w-3"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/20";
                  }}
                />
              ) : (
                <img
                  src="https://via.placeholder.com/20"
                  alt="Default profile"
                  className="aspect-[1] object-contain w-4 shrink-0 mr-1 rounded-full max-md:w-3"
                />
              )}
              <div className="text-black text-xs font-medium self-stretch my-auto max-md:text-sm">
                {organizer}
              </div>
            </div>
            <div className="flex w-full items-center gap-2.5 text-xs text-black font-normal mt-[5px] max-md:gap-1 max-md:text-sm">
              <div className="self-stretch flex items-center gap-1 my-auto max-md:gap-0.5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/46a5f3cf97eee7fdd3d793f5c4e7c8cfecb659f0"
                  alt="Location"
                  className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto max-md:w-2"
                />
                <div className="self-stretch my-auto max-md:w-[80px]">
                  {location}
                </div>
              </div>
              <div className="self-stretch flex items-center gap-1 my-auto max-md:gap-0.5">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/61937ad89daf1bacfe5adea9ccbde54044e1bebf"
                  alt="Date"
                  className="aspect-[1] object-contain w-3 self-stretch shrink-0 my-auto max-md:w-2"
                />
                <div className="self-stretch my-auto max-md:w-[60px]">
                  {date}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-[5px] text-[11px] text-black font-normal whitespace-nowrap max-md:text-xs">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/e6c808677ac0673f51f84c733f91e34175f7e5f3"
              alt="Rating"
              className="aspect-[1] object-contain w-[17px] self-stretch shrink-0 my-auto"
            />
            <div className="self-stretch w-4 my-auto">
              {loading ? "..." : averageRating !== null ? averageRating : "N/A"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[15px] mt-2 max-md:flex-col max-md:gap-1">
          <div className="justify-center items-center shadow-[5px_5px_10px_0px_rgba(0,0,0,0.25)] self-stretch flex min-h-[30px] gap-0.5 text-xs text-black font-normal w-[120px] bg-[#FCEDDA] my-auto px-2.5 py-1.5 rounded-[50px] max-md:w-[100px] max-md:text-sm">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/fcad08a810256f42ea532abb6ab42544e4684cfd"
              alt="Participants"
              className="aspect-[2.38] object-contain w-[38px] self-stretch shrink-0 gap-[-5px] my-auto"
            />
            <div className="text-black self-stretch my-auto">
              {participants}
            </div>
          </div>
          <button
            onClick={handleJoin}
            className="text-[#FCEDDA] self-stretch min-h-[30px] gap-2.5 text-[13px] font-medium whitespace-nowrap w-[70px] bg-[#FF5126] my-auto px-2.5 py-[5px] rounded-[50px] hover:bg-opacity-80 transition-colors max-md:w-[60px] max-md:text-sm"
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCard;