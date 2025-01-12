/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface SecondaryHeaderPseudoLittleProps {
  label: string;
}

const SecondaryHeaderPseudoLittle = ({ label }: SecondaryHeaderPseudoLittleProps) => {
  if (label === "") {
    return null;
  }

  return <h5 className="vkToolsSecondaryHeaderPseudoLittle">{label}</h5>;
};

export default SecondaryHeaderPseudoLittle;
