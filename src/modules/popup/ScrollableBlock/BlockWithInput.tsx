/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useLocalization } from "../../../Localization/LocalizationContext";

interface BlockWithInputProps {
  label: string;
  placeholder: string;
  buttonLabel: string;
  canLink: boolean;
  inputTypes?: string;
  isTextBoxAvailable: boolean;
  option: string;
}

const BlockWithInput: React.FC<BlockWithInputProps> = ({ label, placeholder, buttonLabel, canLink, inputTypes, isTextBoxAvailable, option }) => {
  const [textInputValue, setTextInputValue] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
  };
  const { t } = useLocalization();
  return (
    <div className="vkToolsBlockLabel">
      <h5 className="vkToolsBlockLabelText">{label}</h5>

      <span className="vkToolsInput">
        <input id={option + "__tb__"} placeholder={placeholder} type="text" className="vkToolsInput__placeholder" value={textInputValue} onChange={handleTextChange} disabled={!isTextBoxAvailable} />
        <span aria-hidden="true" className="vkToolsInput__placeholder-empty"></span>
      </span>
      <div className="vkToolsBlockFooter">
        {canLink && (
          <label className="ButtonInstallpreload" id={option + "__link__"}>
            <span className="ButtonInstall">
              <span className="vkToolsPresentation" role="presentation"></span>
              <span className="vkToolsButtonText__in">{buttonLabel}</span>
            </span>
          </label>
        )}

        {canLink && (
          <label className="ButtonInstallpreload" id={option + "__file__"}>
            <span className="ButtonInstall">
              <span className="vkToolsPresentation" role="presentation"></span>
              <span className="vkToolsButtonText__in">
                <svg fill="currentColor" style={{ paddingRight: "4px" }} aria-hidden="true" display="block" className="vkToolsIcon__inButton" viewBox="0 0 20 20" width="20" height="20">
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M10.175 1.5H9c-.806 0-1.465.006-2.01.05-.63.052-1.172.16-1.67.413a4.25 4.25 0 0 0-1.857 1.858c-.253.497-.361 1.04-.413 1.67C3 6.103 3 6.864 3 7.816v4.366c0 .952 0 1.713.05 2.327.052.63.16 1.172.413 1.67a4.25 4.25 0 0 0 1.858 1.857c.497.253 1.04.361 1.67.413.613.05 1.374.05 2.326.05h1.366c.952 0 1.713 0 2.327-.05.63-.052 1.172-.16 1.67-.413a4.251 4.251 0 0 0 1.857-1.857c.253-.498.361-1.04.413-1.67.05-.614.05-1.375.05-2.327V8.325c0-.489 0-.733-.055-.963-.05-.205-.13-.4-.24-.579-.123-.201-.296-.374-.642-.72l-3.626-3.626c-.346-.346-.519-.519-.72-.642a2.001 2.001 0 0 0-.579-.24c-.23-.055-.474-.055-.963-.055ZM15.5 12.15c0 .992 0 1.692-.045 2.238-.044.537-.127.86-.255 1.11A2.751 2.751 0 0 1 14 16.7c-.252.128-.574.21-1.111.255-.546.044-1.245.045-2.238.045h-1.3c-.992 0-1.692 0-2.238-.045-.537-.044-.86-.127-1.11-.255A2.75 2.75 0 0 1 4.8 15.5c-.128-.252-.21-.574-.255-1.111-.044-.546-.045-1.245-.045-2.238v-4.3c0-.992 0-1.692.045-2.238.044-.537.127-.86.255-1.11A2.75 2.75 0 0 1 6.002 3.3c.25-.128.573-.21 1.11-.255C7.658 3.001 8.358 3 9.35 3H10v2.35c0 .409 0 .761.024 1.051.026.306.083.61.238.902.21.398.537.724.935.935.291.155.596.212.902.238.29.024.642.024 1.051.024h2.35v3.65ZM14.879 7 11.5 3.621V5.32c0 .447 0 .736.02.955.017.21.047.288.067.326a.75.75 0 0 0 .312.312c.038.02.116.05.326.068.22.018.508.019.955.019h1.699Z"
                    clip-rule="evenodd"></path>
                </svg>
              </span>
            </span>
            <input accept={inputTypes} type="file" className="vkToolsHiddenInput" />
          </label>
        )}

        {!canLink && (
          <label className="ButtonInstallpreload" id={option + "__not-file__"}>
            <span className="ButtonInstall">
              <span className="vkToolsPresentation" role="presentation"></span>
              <span style={{ display: "flex", paddingRight: "22px" }} className="vkToolsButtonText__in">
                <svg fill="currentColor" style={{ paddingRight: "4px" }} aria-hidden="true" display="block" className="vkToolsIcon__inButton" viewBox="0 0 20 20" width="20" height="20">
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M10.175 1.5H9c-.806 0-1.465.006-2.01.05-.63.052-1.172.16-1.67.413a4.25 4.25 0 0 0-1.857 1.858c-.253.497-.361 1.04-.413 1.67C3 6.103 3 6.864 3 7.816v4.366c0 .952 0 1.713.05 2.327.052.63.16 1.172.413 1.67a4.25 4.25 0 0 0 1.858 1.857c.497.253 1.04.361 1.67.413.613.05 1.374.05 2.326.05h1.366c.952 0 1.713 0 2.327-.05.63-.052 1.172-.16 1.67-.413a4.251 4.251 0 0 0 1.857-1.857c.253-.498.361-1.04.413-1.67.05-.614.05-1.375.05-2.327V8.325c0-.489 0-.733-.055-.963-.05-.205-.13-.4-.24-.579-.123-.201-.296-.374-.642-.72l-3.626-3.626c-.346-.346-.519-.519-.72-.642a2.001 2.001 0 0 0-.579-.24c-.23-.055-.474-.055-.963-.055ZM15.5 12.15c0 .992 0 1.692-.045 2.238-.044.537-.127.86-.255 1.11A2.751 2.751 0 0 1 14 16.7c-.252.128-.574.21-1.111.255-.546.044-1.245.045-2.238.045h-1.3c-.992 0-1.692 0-2.238-.045-.537-.044-.86-.127-1.11-.255A2.75 2.75 0 0 1 4.8 15.5c-.128-.252-.21-.574-.255-1.111-.044-.546-.045-1.245-.045-2.238v-4.3c0-.992 0-1.692.045-2.238.044-.537.127-.86.255-1.11A2.75 2.75 0 0 1 6.002 3.3c.25-.128.573-.21 1.11-.255C7.658 3.001 8.358 3 9.35 3H10v2.35c0 .409 0 .761.024 1.051.026.306.083.61.238.902.21.398.537.724.935.935.291.155.596.212.902.238.29.024.642.024 1.051.024h2.35v3.65ZM14.879 7 11.5 3.621V5.32c0 .447 0 .736.02.955.017.21.047.288.067.326a.75.75 0 0 0 .312.312c.038.02.116.05.326.068.22.018.508.019.955.019h1.699Z"
                    clip-rule="evenodd"></path>
                </svg>
                {buttonLabel}
              </span>
            </span>
            <input accept={inputTypes} type="file" className="vkToolsHiddenInput" />
          </label>
        )}

        <a tabIndex={0} className="config-reset-icon" id="resetlogo" style={{ marginTop: "12px!important" }}>
          <svg viewBox="0 0 20 20" fill="currentColor" className="svg-icon">
            <title>{t("resetFast")}</title>
            <polygon points="16.2,5.5 14.5,3.8 10,8.3 5.5,3.8 3.8,5.5 8.3,10 3.8,14.5 5.5,16.2 10,11.7 14.5,16.2 16.2,14.5 11.7,10"></polygon>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default BlockWithInput;
