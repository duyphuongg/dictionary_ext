import { setupDoubleClick } from "~/utils/dblclick";
import initApp from "~/app";

window.addEventListener("load", _.debounce(init));

function init() {
  initApp();
  setupDoubleClickFunction();
}

function setupDoubleClickFunction() {
  setupDoubleClick(
    "https://dictionary.cambridge.org/",
    "english-vietnamese",
    false,
    null,
    5,
    "popup"
  );
}
