import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TicketSection = ({ data, onChange, onNext }) => {
  const navigate = useNavigate();

  // Debug data yang diterima
  console.log("TicketSection received data:", data);

  const [ticketType, setTicketType] = useState(data.ticketType || "paid");
  const [quantity, setQuantity] = useState(data.quantity || "");
  const [price, setPrice] = useState(data.price || "");
  const [startDate, setStartDate] = useState(data.startDate || "");
  const [startTime, setStartTime] = useState(data.startTime || "");
  const [endDate, setEndDate] = useState(data.endDate || "");
  const [endTime, setEndTime] = useState(data.endTime || "");

  const isFormValid = () => {
    if (!quantity || parseInt(quantity) <= 0) return false;
    if (ticketType === "paid" && (!price || parseInt(price) <= 0)) return false;
    if (!startDate || !startTime || !endDate || !endTime) return false;
    return true;
  };

  useEffect(() => {
    const ticketData = {
      ticketType,
      quantity,
      price,
      startDate,
      startTime,
      endDate,
      endTime,
      maxParticipants: quantity,
    };
    console.log("TicketSection sending data:", ticketData);
    onChange(ticketData);
  }, [
    ticketType,
    quantity,
    price,
    startDate,
    startTime,
    endDate,
    endTime,
    onChange,
  ]);

  return (
    <div className="p-4 sm:p-6">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold mb-4 flex items-center gap-2">
        <img
          src="/img/ticket.svg"
          alt="Ticket Icon"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
        Ticket
      </h2>

      {/* Ticket Type: Paid / Free */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
        <label
          className={`mr-2 flex items-center px-4 py-3 sm:px-5 sm:py-4 border rounded cursor-pointer text-left grow max-w-[467px] relative ${
            ticketType === "paid"
              ? "bg-[#FA5A1E] text-white border-[#FA5A1E]"
              : "bg-transparent border-[#FA5A1E] text-black"
          }`}
        >
          <span
            className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${
              ticketType === "paid"
                ? "border-white bg-white before:block before:w-2 before:h-2 before:rounded-full before:bg-[#FA5A1E] before:mx-auto before:my-[3px]"
                : "border-[#FA5A1E]"
            }`}
          ></span>
          <input
            type="radio"
            name="ticketType"
            value="paid"
            checked={ticketType === "paid"}
            onChange={() => setTicketType("paid")}
            className="absolute opacity-0 w-0 h-0"
          />
          Paid
        </label>

        <label
          className={`flex items-center px-4 py-3 sm:px-5 sm:py-4 border rounded cursor-pointer text-left grow max-w-[467px] relative ${
            ticketType === "free"
              ? "bg-[#FA5A1E] text-white border-[#FA5A1E]"
              : "bg-transparent border-[#FA5A1E] text-black"
          }`}
        >
          <span
            className={`w-4 h-4 inline-block mr-2 rounded-full border-2 ${
              ticketType === "free"
                ? "border-white bg-white before:block before:w-2 before:h-2 before:rounded-full before:bg-[#FA5A1E] before:mx-auto before:my-[3px]"
                : "border-[#FA5A1E]"
            }`}
          ></span>
          <input
            type="radio"
            name="ticketType"
            value="free"
            checked={ticketType === "free"}
            onChange={() => setTicketType("free")}
            className="absolute opacity-0 w-0 h-0"
          />
          Free
        </label>
      </div>

      {/* Quantity & Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1">
            Quantity
          </label>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full bg-[#E8DCCF] border border-black rounded px-3 py-2 text-sm sm:text-base"
            required
          />
        </div>

        <div>
          <label className="block text-xs sm:text-sm font-medium mb-1">
            Price
          </label>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Price"
            value={price}
            onChange={(e) => {
              const onlyNums = e.target.value.replace(/[^0-9]/g, "");
              setPrice(onlyNums);
            }}
            className="w-full bg-[#E8DCCF] border border-black rounded px-3 py-2 text-sm sm:text-base appearance-none"
            disabled={ticketType === "free"}
            required={ticketType === "paid"}
          />
        </div>
      </div>

      {/* Sale Date Section */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold mb-1">Sale date</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-4">
          Set the sale time when your audience is able to purchase the tickets
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              Start date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-[#E8DCCF] border border-black rounded px-3 py-2 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              Start time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-[#E8DCCF] border border-black rounded px-3 py-2 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              End date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-[#E8DCCF] border border-black rounded px-3 py-2 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-medium mb-1">
              End time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-[#E8DCCF] border border-black rounded px-3 py-2 text-sm sm:text-base"
              required
            />
          </div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between sm:justify-end gap-2 sm:gap-4 mt-4 sm:mt-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 bg-[#FFE1BF] text-black px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg"
        >
          ← Back
        </button>
        <button
          onClick={() => {
            if (isFormValid()) onNext();
          }}
          disabled={!isFormValid()}
          className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2 text-sm sm:text-base rounded-lg ${
            isFormValid()
              ? "bg-[#FA5A1E] hover:bg-[#e14e17] text-white"
              : "bg-[#FA5A1E] text-white cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default TicketSection;