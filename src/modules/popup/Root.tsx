import React, { useState, useEffect, useRef } from "react";
import Header from "./Header/Header";
import ScrollableBlock from "./ScrollableBlock/ScrollableBlock";
import TabBar from "./TabBar/TabBar";
import { LocalizationProvider } from "../../Localization/LocalizationContext";
import FullscreenOnlyModal from "./FullscreenOnlyModal";

export default function Root() {
  const [valueFromTabbar, setValueFromTabbar] = useState("tab1");
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);

  const scrollPositionsRef = useRef<{ [key: string]: number }>({});

  const scrollableRef = useRef<any>(null);

  const handleTabChange = (tab: string) => {
    if (scrollableRef.current) {
      scrollPositionsRef.current[valueFromTabbar] = scrollableRef.current.getScrollPosition();
    }
    setValueFromTabbar(tab);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === "INPUT" && (target.getAttribute("type") === "file" || target.getAttribute("type") === "color")) {
        if (navigator.userAgent.toLowerCase().includes("firefox")) {
          const isPopup = window.innerWidth < 800 && window.innerHeight < 800;
          if (isPopup) {
            event.preventDefault();
            event.stopPropagation();
            setShowFullscreenModal(true);
          }
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return (
    <LocalizationProvider>
      <div className="vkToolsRoot">
        <Header />
        <ScrollableBlock id={valueFromTabbar} ref={scrollableRef} initialScroll={scrollPositionsRef.current[valueFromTabbar] || 0} />
        <TabBar onTabChange={handleTabChange} />
        {showFullscreenModal && <FullscreenOnlyModal onClose={() => setShowFullscreenModal(false)} />}
      </div>
    </LocalizationProvider>
  );
}
