/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import ToolTipToRight from "../BlockWithActions/ToolTipToRight";

interface HeaderPseudoTransparentProps {
  label: string;
  textForTT?: string;
}

const HeaderPseudoTransparent = ({ label, textForTT }: HeaderPseudoTransparentProps) => {
  if (label === "") {
    return null;
  }

  return (
    <div className="vkToolsPseudoHeaderWrapper">
      <h3 className="vkToolsPseudoHeaderTransparent">{label}</h3>
      {textForTT && <ToolTipToRight text={textForTT} />}
    </div>
  );
};

export default HeaderPseudoTransparent;
