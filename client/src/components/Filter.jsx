import React, { useState } from "react";
import { filerMenu } from "../utils/supports";
import { NavLink } from "react-router-dom";

export const FilterButtons = ({ label, icon, to }) => {
  const Icon = icon;
  const [active, setActive] = useState(false);

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        setActive(isActive);
      }}
    >
      <div
        className={`flex items-center justify-center gap-1 px-2 py-1 text-sm md:text-lg md:px-4 md:py-2 rounded-full ${
          active && "bg-zinc-100"
        } cursor-pointer`}
      >
        <Icon
          className={`${active ? "text-emerald-400" : "text-primary"} text-sm md:text-lg`}
        />
        <p className="text-base text-primary">{label}</p>
      </div>
    </NavLink>
  );
};

const Filter = () => {
  return (
    <div className=" flex items-start justify-center xl:items-center xl:justify-center gap-1 md:gap-12 pt-6">
      {filerMenu &&
        filerMenu.map((menu) => (
          <FilterButtons
            key={menu.id}
            label={menu.label}
            icon={menu.icon}
            to={menu.to}
          />
        ))}
    </div>
  );
};

export default Filter;
