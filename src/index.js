import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

const rootEl = document.getElementById("root");
if (rootEl !== null) {
  createRoot(rootEl).render(<App />);
}
