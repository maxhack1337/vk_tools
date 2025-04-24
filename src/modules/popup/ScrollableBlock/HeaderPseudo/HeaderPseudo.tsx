/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface HeaderPseudoProps {
  label: string;
  marginTop?: boolean;
}

const HeaderPseudo = ({ label, marginTop }: HeaderPseudoProps) => {
  if (label === "") {
    return null;
  }

  return (
    <h3 style={marginTop ? { marginTop: "8px" } : undefined} className="vkToolsPseudoHeader">
      {label}
    </h3>
  );
};

export default HeaderPseudo;
