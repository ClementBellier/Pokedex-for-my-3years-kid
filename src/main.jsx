import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div className="frame" data-bg-color="green">
      <App />
    </div>
  </React.StrictMode>
);
