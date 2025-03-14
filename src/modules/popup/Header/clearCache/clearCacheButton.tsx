import React, { useState } from "react";
import { useLocalization } from "../../../../Localization/LocalizationContext";
import ClearCacheModal from "./clearCacheModal";

export default function ClearCacheButton() {
  const { getLang: t } = useLocalization();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div id="openCache" className="vkenhancerThemeChanger">
      <button title={t("clearCache")} id="openDialog" type="button" className="vkenhancerButtonHeader" onClick={handleOpenModal}>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M25.2072 2.79281C25.5976 3.18323 25.5976 3.81622 25.2072 4.20664L23.0158 6.39825C24.3016 8.33908 24.0895 10.9797 22.3795 12.6896L22.0057 13.0641C22.3538 17.42 20.8145 21.3238 17.4311 24.7072C17.1774 24.9608 16.8073 25.0591 16.4612 24.9648C13.6859 24.2079 10.9481 22.4656 8.24124 19.7588C5.53435 17.0519 3.79215 14.3141 3.03525 11.5388C2.94085 11.1927 3.03916 10.8226 3.29284 10.5689C6.67582 7.18589 10.5792 5.64655 14.9346 5.99424L15.3104 5.62047C17.0201 3.91077 19.6602 3.69848 21.6009 4.98359L23.7934 2.79281C24.1838 2.4024 24.8168 2.4024 25.2072 2.79281ZM20.0061 13.145L14.8551 7.99288L14.484 7.9673C11.0223 7.76721 7.92319 8.95683 5.13229 11.5707C5.86675 13.799 7.36894 16.0588 9.65507 18.3449C11.9412 20.6311 14.201 22.1333 16.4293 22.8677C19.1362 19.9775 20.3157 16.7567 20.0061 13.145ZM20.9657 7.0343C19.7944 5.86305 17.8955 5.86305 16.7242 7.0343L20.9657 11.2758C22.137 10.1045 22.137 8.20556 20.9657 7.0343Z"
            fill="currentColor"
          />
        </svg>
      </button>

      {isModalOpen && <ClearCacheModal onClose={handleCloseModal} />}
    </div>
  );
}
