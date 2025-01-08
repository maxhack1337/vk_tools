import React from "react";

interface CheckBoxProps {
  id?: string;
  type: string;
  description?: string;
  label: string;
}

const CheckBox = ({ id, type, description, label }: CheckBoxProps) => {
  if (type !== "checkBox") {
    return null;
  }

  return (
    <label id={id} className="vkToolsCheckBox">
      <div className="vkToolsCheckBox__Label">
        {label && (
          <div className="vkToolsCheckBox__PrimaryText">
            <span className="vkToolsCheckBox__PrimaryTextSpan">{label}</span>
          </div>
        )}
        {description && (
          <div className="vkToolsCheckBox__SecondaryText">
            <span className="vkToolsCheckBox__SecondaryTextSpan">{description}</span>
          </div>
        )}
      </div>
      <div className="vkToolsCheckBox__Check">
        <label className="vkToolsCheckBox__Check--label">
          <input id={id} type="checkbox" className="vkToolsCheckBox__Check--label-input" />
          <span aria-hidden="true" className="vkToolsCheckBox__Check--label-span"></span>
          <span aria-hidden="true" className="vkToolsCheckBox__Check--label-spanHidden"></span>
        </label>
      </div>
    </label>
  );
};

export default CheckBox;
