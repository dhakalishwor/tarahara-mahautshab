import React from "react";  // <-- this line is missing in your file
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);
