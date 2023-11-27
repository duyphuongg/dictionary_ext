import { createRoot } from "react-dom/client";
import App from "./App.jsx";

export default function initApp() {
  const container = document.createElement("div");
  container.setAttribute("id", "dictionaryExt");
  document.querySelector("body").appendChild(container);
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  }
}
