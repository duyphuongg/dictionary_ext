import { setupDoubleClick } from "~/utils/dblclick-translate";
// import initApp from "~/app";

window.addEventListener("load", _.debounce(init));

function init() {
  // initApp();
  setupDoubleClickTranslate();
}

function setupDoubleClickTranslate() {
  setupDoubleClick(
    "https://dictionary.cambridge.org/",
    "english-vietnamese",
    false,
    null,
    200,
    "popup"
  );
}
