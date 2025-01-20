import sendGraffity from "./sendGraffity";

    const handleGraffity = async() => {
      const graffityFileInput = document.querySelector(
        ".vkEnhancerVisuallyHidden"
        ) as HTMLInputElement;
      const files = graffityFileInput.files || [];
      const file = files[0];
      await sendGraffity(file);
}
    
export default handleGraffity;