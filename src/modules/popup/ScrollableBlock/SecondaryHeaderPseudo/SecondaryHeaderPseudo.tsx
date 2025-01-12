/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface SecondaryHeaderPseudoProps {
  label: string;
}

const SecondaryHeaderPseudo = ({ label }: SecondaryHeaderPseudoProps) => {
  if (label === "") {
    return null;
  }

  return <h4 className="vkToolsSecondaryHeaderPseudo">{label}</h4>;
};

export default SecondaryHeaderPseudo;
