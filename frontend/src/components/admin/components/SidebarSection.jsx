import React, { useState } from "react";
import PropTypes from "prop-types";

const SidebarSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mt-6">
      {/* Section Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 mb-2 overflow-hidden"
      >
        <span className="text-lg font-bold truncate pr-2">{title}</span>
        <span
          className={`transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ▼
        </span>
      </button>

      {/* Section Content */}
      <div
        className={`
          overflow-hidden transition-all duration-200 px-2
          ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {children}
      </div>
    </div>
  );
};

SidebarSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  defaultOpen: PropTypes.bool,
};

export default SidebarSection;
