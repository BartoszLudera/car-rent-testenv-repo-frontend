"use clint";
import React from "react";

export default function MenuLink({ label, onClick }) {
  return React.createElement(
    "div",
    {
      onClick: onClick,
      className: "px-5 py-4 cursor-pointer hover:bg-gray-100 transition",
    },
    label
  );
}
