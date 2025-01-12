/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface LeftMenuSaveButtonProps {
  label: string;
  onClick: () => void;
}

const LeftMenuSaveButton = ({ label, onClick }: LeftMenuSaveButtonProps) => {
  if (label === "") {
    return null;
  }
  return (
    <label className="ButtonInstallpreload" id="leftmenusave" style={{ margin: "12px 12px 12px;" }} onClick={onClick}>
      <span className="ButtonInstall">
        <span className="vkToolsPresentation" role="presentation"></span>
        <span className="vkToolsButtonText__in">{label}</span>
      </span>
    </label>
  );
};

export default LeftMenuSaveButton;
