/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface HeaderPseudoTransparentProps {
  label: string;
}

const HeaderPseudoTransparent = ({ label }: HeaderPseudoTransparentProps) => {
  if (label === "") {
    return null;
  }

  return <h3 className="vkToolsPseudoHeaderTransparent">{label}</h3>;
};

export default HeaderPseudoTransparent;
