/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";

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
  const [isChecked, setIsChecked] = useState(false);
  const [rippleStyle, setRippleStyle] = useState<{ display: string; top: string; left: string; width: string; height: string }>({ display: "none", top: "0", left: "0", width: "0", height: "0" });

  useEffect(() => {
    chrome.storage.local.get([`${id}State`], (result) => {
      if (result[`${id}State`] !== undefined) {
        setIsChecked(result[`${id}State`]);
      } else {
        setIsChecked(false);
      }
    });
  }, [id]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    chrome.storage.local.set({
      [`${id}State`]: checked,
    });

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const activeTabId = tabs[0].id;
      if (activeTabId !== undefined) {
        chrome.tabs.sendMessage(activeTabId, {
          type: `${id}Toggle`,
          isChecked: checked,
        });
        if (shouldReload) chrome.tabs.reload(activeTabId);
      }
    });
  };

  const handleRippleEffect = (event: React.MouseEvent<HTMLLabelElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    setRippleStyle({
      display: "block",
      top: `${y}px`,
      left: `${x}px`,
      width: `${size}px`,
      height: `${size}px`,
    });

    setTimeout(() => {
      setRippleStyle({ ...rippleStyle, display: "none" });
    }, 600);
  };

  if (type !== "checkBox") {
    return null;
  }

  return (
    <label id={id} className={`vkToolsCheckBox ${description ? "vkToolsCheckBoxWithDescription" : ""}`} onClick={handleRippleEffect}>
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
                <img className="newFire" src="assets/fire_circle_fill_red_20.svg" />
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
          <input id={id} type="checkbox" className="vkToolsCheckBox__Check--label-input" checked={isChecked} onChange={handleChange} />
          <span aria-hidden="true" className="vkToolsCheckBox__Check--label-span"></span>
          <span aria-hidden="true" className="vkToolsCheckBox__Check--label-spanHidden"></span>
        </label>
      </div>
      <span className="ripple" style={{ ...rippleStyle }}></span>
    </label>
  );
};

export default CheckBox;
