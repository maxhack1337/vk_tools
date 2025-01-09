/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface HeaderPseudoProps {
  label: string;
}

const HeaderPseudo = ({ label }: HeaderPseudoProps) => {
  if (label === "") {
    return null;
  }

  return <h3 className="vkToolsPseudoHeader">{label}</h3>;
};

export default HeaderPseudo;
