import { setupDoubleClick } from "./dblclick";

window.addEventListener(
  "load",
  _.debounce(setupDoubleClickFunction)
);

function setupDoubleClickFunction() {
  setupDoubleClick(
    "https://dictionary.cambridge.org/",
    "british",
    false,
    null,
    5,
    "popup"
  );
}
