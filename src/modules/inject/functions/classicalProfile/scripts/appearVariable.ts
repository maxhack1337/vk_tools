const appearVariable = async() => {
        let profileInfo = document.querySelector(".ProfileInfo") as HTMLElement;
        let profileInfoHeight = profileInfo?.offsetHeight;
        document.documentElement.style.setProperty(
          "--vkenhancer-info-height",
          profileInfoHeight + "px"
        );
}
      
export default appearVariable;