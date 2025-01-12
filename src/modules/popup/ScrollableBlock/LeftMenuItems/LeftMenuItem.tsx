/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface LeftMenuItemProps {
  label: string;
  id: string;
  value: string;
  onChange: (id: string, newValue: string) => void;
}

const LeftMenuItem = ({ label, id, value, onChange }: LeftMenuItemProps) => {
  if (label === "") {
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(id.replace("Left", ""), e.target.value);
  };

  return (
    <div className="vkToolsLeftMenuItem">
      <h5 className="vkToolsLowText--in flstart">{label}</h5>
      <span className="vkToolsInput">
        <input id={id} placeholder={label} type="text" className="vkToolsInput__placeholder" value={value} onChange={handleInputChange} />
        <span aria-hidden="true" className="vkToolsInput__placeholder-empty"></span>
      </span>
    </div>
  );
};

export default LeftMenuItem;
