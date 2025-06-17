import React from "react";
import PropTypes from "prop-types";

const StatCard = ({
  title,
  value,
  secondaryValue,
  secondaryLabel,
  percentChange,
  timeframe,
  isNegative = false,
}) => {
  return (
    <div className="bg-[#FF570C] rounded-lg p-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-medium text-white">{title}</h3>
        <button className="text-white hover:text-gray-600">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/cc19c8fb85a142d1a49f6d5b2b38adc8/6c9d836a91f44567127f7ba9a75818fecad9b72f"
            alt="More options"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Values */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-4xl font-bold text-white">{value}</div>
        {secondaryValue && secondaryLabel && (
          <div className="flex items-center gap-1 text-white">
            <span className="text-4xl font-bold">{secondaryValue}</span>
            <span className="text-base">{secondaryLabel}</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-300 mb-4" />

      {/* Change Indicator */}
      <div className="flex items-center gap-2">
        <span
          className={`font-bold ${
            isNegative ? "text-[#ff3b30]" : "text-[#34c759]"
          }`}
        >
          {percentChange}
        </span>
        <span className="text-white">{timeframe}</span>
      </div>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  secondaryValue: PropTypes.string,
  secondaryLabel: PropTypes.string,
  percentChange: PropTypes.string.isRequired,
  timeframe: PropTypes.string.isRequired,
  isNegative: PropTypes.bool,
};

export default StatCard;
