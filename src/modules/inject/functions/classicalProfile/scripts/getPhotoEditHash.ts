      const getPhotoEditHash = () => {
        let script = Array.from(document.querySelectorAll("script")).find((e) =>
          e.innerHTML.includes("window.initReactApplication")
        );
          let scriptContent = script?.innerHTML;
          if (scriptContent) {
              let startIndex = scriptContent.indexOf('"hashes":{');
              if (startIndex === -1) return undefined;
              let endIndex = scriptContent.indexOf("}", startIndex) + 1;
              let hashesString = scriptContent.substring(startIndex, endIndex);
              let braceIndex = hashesString.indexOf("{");
              hashesString = hashesString.substring(braceIndex);
              let hashesObject = JSON.parse(hashesString);
              let avatarEditHash = hashesObject.avatarEdit;
              return avatarEditHash;
          }
          return false;
}
      
export default getPhotoEditHash;