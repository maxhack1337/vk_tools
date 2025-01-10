/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface LeftMenuItemProps {
  label: string;
  id: string;
}

const LeftMenuItem = ({ label, id }: LeftMenuItemProps) => {
  if (label === "") {
    return null;
  }
  return (
    <div className="vkToolsLeftMenuItem">
      <h5 className="vkToolsLowText--in flstart">{label}</h5>
      <span className="vkToolsInput">
        <input id={id} placeholder={label} type="text" className="vkToolsInput__placeholder" value="" />
        <span aria-hidden="true" className="vkToolsInput__placeholder-empty"></span>
      </span>
    </div>
  );
};

export default LeftMenuItem;
