import React from "react";
import "./App.css";
import Root from "./modules/popup/Root";
import { LocalizationProvider } from "./Localization/LocalizationContext";

function App() {
  return (
    <LocalizationProvider>
      <div className="App">
        <Root />
      </div>
    </LocalizationProvider>
  );
}

export default App;
