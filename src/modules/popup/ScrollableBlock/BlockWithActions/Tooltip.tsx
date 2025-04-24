import React from "react";

interface ToolTipProps {
  text: string;
  alertIcon?: boolean;
}

const ToolTip: React.FC<ToolTipProps> = ({ text, alertIcon }) => (
  <div className="vkToolsTooltipWrapper">
    <span className="vkToolsTooltipIcon">
      {!alertIcon ? (
        <svg aria-hidden="true" display="block" className="vkuiIcon vkuiIcon--16 vkuiIcon--w-16 vkuiIcon--h-16 vkuiIcon--help_outline_16" width="16" height="16" viewBox="0 0 16 16" style={{ width: "16px", height: "16px" }}>
          <path
            fill="var(--vkui--color_text_secondary)"
            d="M7.972 9.598c.376 0 .583-.21.662-.572.07-.454.228-.686.932-1.102.747-.449 1.134-1.005 1.134-1.82 0-1.26-1.012-2.102-2.516-2.102-1.139 0-1.986.46-2.325 1.172-.106.206-.159.41-.159.643 0 .41.26.675.678.675.323 0 .561-.15.694-.497.17-.48.519-.74 1.038-.74.583 0 .985.368.985.897 0 .497-.206.767-.89 1.183-.625.373-.948.794-.948 1.432v.075c0 .443.265.756.715.756M8 2.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11M1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8m7.9 3.1a.9.9 0 0 1-.9.9.9.9 0 0 1-.9-.9.9.9 0 0 1 .9-.9.9.9 0 0 1 .9.9"></path>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8 2.5C4.96243 2.5 2.5 4.96243 2.5 8C2.5 11.0376 4.96243 13.5 8 13.5C11.0376 13.5 13.5 11.0376 13.5 8C13.5 4.96243 11.0376 2.5 8 2.5ZM1 8C1 4.13401 4.13401 0.999999 8 0.999999C11.866 1 15 4.13401 15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8Z"
            fill="var(--vkui--color_text_secondary)"
          />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C8.41421 4 8.75 4.33579 8.75 4.75L8.75 8.25C8.75 8.66421 8.41421 9 8 9C7.58579 9 7.25 8.66421 7.25 8.25L7.25 4.75C7.25 4.33579 7.58579 4 8 4Z" fill="var(--vkui--color_text_secondary)" />
          <path d="M8.89998 11.1C8.89998 11.5971 8.49703 12 7.99998 12C7.50292 12 7.09998 11.5971 7.09998 11.1C7.09998 10.6029 7.50292 10.2 7.99998 10.2C8.49703 10.2 8.89998 10.6029 8.89998 11.1Z" fill="var(--vkui--color_text_secondary)" />
        </svg>
      )}
    </span>
    <div className="vkToolsFloatingArrow__host">
      <svg width="20" height="9" viewBox="0 0 20 9" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 0c3 0 6 8 10 8v1H0V8c3.975 0 7-8 10-8Z" fill="currentColor"></path>
      </svg>
    </div>
    <div className="vkToolsTooltipText">{text}</div>
  </div>
);

export default ToolTip;
