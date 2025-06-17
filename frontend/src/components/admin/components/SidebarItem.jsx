import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ children, to, active = false }) => {
  const baseClasses = `
        block w-full px-4 py-2 rounded-md cursor-pointer
        text-lg font-medium text-left truncate
        transition-colors duration-200 mb-2 mx-2
  `;

  return to ? (
    <NavLink
      to={to}
      className={({ isActive }) => `
        ${baseClasses}
        ${isActive ? "bg-[#FCEDDA]" : "hover:bg-[#FCEDDA]/50"}
      `}
    >
      <div className="flex items-center overflow-hidden">
        <span className="truncate">{children}</span>
      </div>
    </NavLink>
  ) : (
    <div
      className={`
        ${baseClasses}
        ${active ? "bg-[#FCEDDA]" : "hover:bg-[#FCEDDA]/50"}
      `}
    >
      <div className="flex items-center overflow-hidden">
        <span className="truncate">{children}</span>
      </div>
    </div>
  );
};

SidebarItem.propTypes = {
  children: PropTypes.node.isRequired,
  to: PropTypes.string,
  active: PropTypes.bool,
};

export default SidebarItem;
