/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface CheckBoxProps {
  id: string;
  type: string;
  description?: string;
  label: string;
  isNew?: boolean;
  isFire?: boolean;
  shouldReload?: boolean;
}

const CheckBox = ({ id, type, description, label, isNew, isFire, shouldReload }: CheckBoxProps) => {
  if (type !== "checkBox") {
    return null;
  }

  return (
    <label id={id} className="vkToolsCheckBox">
      <div className="vkToolsCheckBox__Label">
        {label && (
          <div className="vkToolsCheckBox__PrimaryText">
            {isNew && (
              <span className="newFunctionSpan">
                <img className="newFire" src="assets/new_function_text.svg" />
              </span>
            )}
            {isFire && (
              <span className="newSpan">
                <img className="newFire" src="assets/new.png" />
              </span>
            )}
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
