import { useState } from "react";
import { useLocalization } from "../../../Localization/LocalizationContext";
import React from "react";

const svg28Style: React.CSSProperties = {
  width: "28px",
  height: "28px",
};

const TabBar = () => {
  const { getLang: t } = useLocalization();
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    {
      id: "tab1",
      label: t("appearance"),
      icon: (
        <svg fill="currentColor" aria-hidden="true" display="block" className="vkToolsTabbbarItem__icon-in" viewBox="0 0 21 21" width="28" height="28" style={svg28Style}>
          <path
            fill="currencColor"
            fillRule="evenodd"
            d="M12.004 8.13c-.368.835-.857 1.717-1.507 2.367s-1.532 1.14-2.367 1.507c.835.367 1.717.857 2.367 1.507s1.14 1.532 1.507 2.367c.367-.835.857-1.717 1.507-2.367s1.532-1.14 2.367-1.507c-.835-.368-1.717-.857-2.367-1.507s-1.14-1.532-1.507-2.367m-.785-2.178c-.421 1.317-1.014 2.716-1.782 3.485-.769.768-2.168 1.36-3.485 1.782a21 21 0 0 1-1.162.338c-.38.1-.38.793 0 .894a27 27 0 0 1 .912.26q.124.037.25.078c1.317.421 2.716 1.014 3.485 1.782s1.36 2.168 1.782 3.485a21 21 0 0 1 .27.907l.068.255c.1.38.793.38.894 0a28 28 0 0 1 .26-.912q.037-.124.078-.25c.421-1.317 1.014-2.717 1.782-3.485s2.168-1.36 3.485-1.782a21 21 0 0 1 .907-.27l.255-.068c.38-.1.38-.793 0-.894a28 28 0 0 1-.912-.26l-.25-.078c-1.317-.421-2.717-1.014-3.485-1.782-.768-.769-1.36-2.168-1.782-3.485a21 21 0 0 1-.338-1.162c-.1-.38-.793-.38-.894 0a27 27 0 0 1-.26.912zM4.365.763a.385.385 0 0 0-.73 0l-.414 1.24a1.93 1.93 0 0 1-1.218 1.218l-1.24.414a.385.385 0 0 0 0 .73l1.24.414a1.93 1.93 0 0 1 1.218 1.218l.414 1.24a.385.385 0 0 0 .73 0l.414-1.24a1.93 1.93 0 0 1 1.218-1.218l1.24-.414a.385.385 0 0 0 0-.73l-1.24-.414a1.93 1.93 0 0 1-1.218-1.218z"></path>
        </svg>
      ),
    },
    {
      id: "tab2",
      label: t("oldDTab"),
      icon: (
        <svg fill="currentColor" aria-hidden="true" display="block" className="vkToolsTabbbarItem__icon-in" viewBox="0 0 21 21" width="28" height="28" style={svg28Style}>
          <path
            fill="currentColor"
            d="M7.08 3.5c-1.66 0-2.02.17-2.36.35-.38.2-.67.5-.87.87-.18.34-.35.7-.35 2.36v5.84c0 1.66.17 2.02.35 2.36.2.38.5.67.87.87.34.18.7.35 2.36.35h5.84c1.66 0 2.02-.17 2.36-.35.38-.2.67-.5.87-.87.18-.34.35-.7.35-2.36V7.08c0-1.66-.17-2.02-.35-2.36-.2-.38-.5-.67-.87-.87-.34-.18-.7-.35-2.36-.35H7.08zm-3.07-.97C4.66 2.18 5.31 2 7.08 2h5.84c1.77 0 2.42.18 3.07.53.64.34 1.14.84 1.48 1.48.35.65.53 1.3.53 3.07v5.84c0 1.77-.18 2.42-.53 3.07A3.57 3.57 0 0116 17.47c-.65.35-1.3.53-3.07.53H7.08c-1.77 0-2.42-.18-3.07-.53A3.57 3.57 0 012.53 16c-.35-.65-.53-1.3-.53-3.07V7.08c0-1.77.18-2.42.53-3.07.34-.64.84-1.14 1.48-1.48z"></path>
          <path
            fill="currentColor"
            d="M13.5 11.55a2.15 2.15 0 01-.85 1.8c-.3.23-.64.4-1 .5-.37.1-.83.15-1.4.15H7V6h2.87c.6 0 1.05.02 1.35.07.31.04.6.14.87.28.3.15.51.36.65.62.15.25.22.55.22.89 0 .39-.1.74-.3 1.04-.2.3-.47.53-.82.67v.05c.5.1.9.31 1.2.64.3.31.46.75.46 1.29zm-2.61-3.29a.88.88 0 00-.1-.4.6.6 0 00-.32-.3c-.13-.05-.3-.08-.48-.08l-.82-.01h-.14v1.69h.26l.73-.01c.14 0 .29-.05.43-.11a.65.65 0 00.34-.32c.06-.13.1-.28.1-.46zm.5 3.25a.97.97 0 00-.14-.58.93.93 0 00-.46-.31c-.13-.05-.3-.08-.52-.08l-.86-.01h-.38v2H10.24c.2-.01.41-.06.62-.15a.8.8 0 00.4-.35c.1-.15.14-.32.14-.52z"></path>
        </svg>
      ),
    },
    {
      id: "tab3",
      label: t("messenger"),
      icon: (
        <svg fill="currentColor" aria-hidden="true" display="block" className="vkToolsTabbbarItem__icon-in" viewBox="0 0 28 28" width="28" height="28" style={svg28Style}>
          <g fill="currentColor" fillRule="evenodd">
            <path
              fill="currentColor"
              fillRule="nonzero"
              d="M14 3.5c6.32 0 11.5 4.44 11.5 10s-5.18 10-11.5 10c-1.355 0-2.678-.204-3.924-.597-1.402 1.306-3.458 1.994-6.124 2.098a1.434 1.434 0 0 1-1.363-2.023c.911-2.015 1.413-3.498 1.514-4.379C3.062 17.073 2.5 15.323 2.5 13.5c0-5.56 5.18-10 11.5-10Zm0 2c-5.278 0-9.5 3.619-9.5 8 0 1.508.497 2.955 1.426 4.213a1 1 0 0 1 .196.598c-.004 1.047-.45 2.567-1.33 4.627 1.987-.208 3.388-.831 4.245-1.837a1 1 0 0 1 1.111-.287c1.202.45 2.506.686 3.852.686 5.278 0 9.5-3.619 9.5-8s-4.222-8-9.5-8Z"></path>
          </g>
        </svg>
      ),
    },
    {
      id: "tab4",
      label: t("other"),
      icon: (
        <svg fill="currentColor" aria-hidden="true" display="block" className="vkToolsTabbbarItem__icon-in" viewBox="0 0 28 28" width="28" height="28" style={svg28Style}>
          <g fill="currentColor" fillRule="evenodd">
            <path
              fill="currentColor"
              fillRule="nonzero"
              d="M18.5 15a3.502 3.502 0 0 1 3.355 2.5H24a1 1 0 0 1 0 2h-2.145a3.502 3.502 0 0 1-6.71 0H4a1 1 0 0 1 0-2h11.145A3.502 3.502 0 0 1 18.5 15m0 1.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M10.5 6a3.502 3.502 0 0 1 3.355 2.5H24a1 1 0 0 1 0 2H13.855a3.502 3.502 0 0 1-6.71 0H4a1 1 0 0 1 0-2h3.145A3.502 3.502 0 0 1 10.5 6m0 1.75a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5"></path>
          </g>
        </svg>
      ),
    },
    {
      id: "tab5",
      label: t("information"),
      icon: (
        <svg fill="currentColor" aria-hidden="true" display="block" className="vkToolsTabbbarItem__icon-in" viewBox="0 0 28 28" width="28" height="28" style={svg28Style}>
          <g fill="currentColor" fillRule="evenodd">
            <path
              fill="currentColor"
              fillRule="nonzero"
              d="M14 2c6.627 0 12 5.373 12 12s-5.373 12-12 12S2 20.627 2 14 7.373 2 14 2m0 2C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4m.074 8c.237 0 .386.037.517.107.13.07.232.172.302.302.07.13.107.28.107.517v6.148c0 .237-.037.386-.107.517a.727.727 0 0 1-.302.302c-.13.07-.28.107-.517.107h-.148c-.237 0-.386-.037-.517-.107a.727.727 0 0 1-.302-.302c-.07-.13-.107-.28-.107-.517v-6.148c0-.237.037-.386.107-.517a.727.727 0 0 1 .302-.302c.13-.07.28-.107.517-.107zM14 7.6a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8"></path>
          </g>
        </svg>
      ),
    },
  ];

  return (
    <div className="vkToolsInternalTabbar">
      {tabs.map(({ id, label, icon }) => (
        <button key={id} className={`vkToolsTabbarItem ${activeTab === id ? "active" : ""}`} onClick={() => setActiveTab(id)}>
          <div className="vkToolsTabbarItem__icon">{icon}</div>
          <div className="vkToolsTabbarItem__label">{label}</div>
        </button>
      ))}
    </div>
  );
};

export default TabBar;
