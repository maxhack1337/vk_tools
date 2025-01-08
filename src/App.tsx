import React from "react";
import "./App.css";
import Root from "./modules/popup/Root";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function App() {
  return (
    <SimpleBar style={{ maxHeight: 600 }}>
      <div className="App">
        <Root />
      </div>
    </SimpleBar>
  );
}

export default App;
