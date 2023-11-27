export const setupDoubleClick = (
  websiteUrl,
  dictionary,
  showFirstEntry,
  areaClass,
  maxAllowedWords,
  target,
  urlCallback
) => {
  // warning message for developers
  if (!websiteUrl || !dictionary) {
    alert(
      "Please specify required parameters (websiteUrl and dictionary) to setupDoubleClick()"
    );
    return;
  }

  // opens the definition popup
  const openPopup = (lookup, translateDictionary) => {
    let searchUrl;
    if (urlCallback)
      searchUrl = urlCallback(
        websiteUrl,
        translateDictionary,
        showFirstEntry,
        lookup
      );
    else
      searchUrl =
        websiteUrl +
        "dictionary/" +
        (translateDictionary ? translateDictionary + "/" : "") +
        (showFirstEntry ? "direct/" : "") +
        lookup;

    if (target) {
      if (target == "self") {
        window.location.href = searchUrl;
        return;
      }
      let popup = window.open(
        searchUrl,
        target,
        "toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no,copyhistory=no,width=915,height=760,top=300,left=300"
      );
      if (popup) popup.focus();
    } else {
      window.open(searchUrl, "cup_lookup");
    }
  };

  // shows the definition layer
  const showLayer = (e) => {
    let translateDictionary = dictionary;
    let node = e.target || e.srcElement;
    while (node != null) {
      let lang = node.getAttribute("dict");
      if (lang) {
        translateDictionary = lang;
        break;
      }
      if (node.parentNode == node.ownerDocument) {
        break;
      }
      node = node.parentNode;
    }
    e.preventDefault();
    let lookup = getSelectedText();
    lookup = lookup.replace(/[\.\*\?;!()\+,\[:\]<>^_`\[\]{}~\\\/\"\'=]/g, " ");
    lookup = lookup.replace(/\s+/g, " ");
    if (lookup != null && lookup.replace("/s/g", "").length > 0) {
      // disable the double-click feature if the lookup string
      // exceeds the maximum number of allowable words
      if (maxAllowedWords && lookup.split(/[ -]/).length > maxAllowedWords)
        return;

      // append the layer to the DOM only once
      if (!document.getElementById("definition_layer")) {
        let imageUrl =
          websiteUrl + "external/images/doubleclick/definition-layer.gif";
        let definitionLayer = document.createElement("div");
        definitionLayer.id = "definition_layer";
        definitionLayer.style.cssText = "position:absolute; cursor:pointer;";
        definitionLayer.innerHTML =
          "<img src='" + imageUrl + "' alt='' title=''/>";
        document.body.appendChild(definitionLayer);
      }

      // move the layer at the cursor position
      let definitionLayerEle = document.getElementById("definition_layer");
      definitionLayerEle.style.left = e.pageX - 30 + "px";
      definitionLayerEle.style.top = e.pageY - 40 + "px";

      // open the definition popup clicking on the layer
      definitionLayerEle.addEventListener("mouseup", function (e) {
        e.stopPropagation();
        openPopup(lookup, translateDictionary);
      });
    } else {
      let definitionLayerEle = document.getElementById("definition_layer");
      if (definitionLayerEle) {
        definitionLayerEle.parentNode.removeChild(definitionLayerEle);
      }
    }
  };

  let area = areaClass ? "." + areaClass : "body";
  document.querySelector(area)?.addEventListener("mouseup", showLayer);
};

/*
 * Cross-browser function to get selected text
 */
export const getSelectedText = () => {
  if (window.getSelection) return window.getSelection().toString();
  else if (document.getSelection) return document.getSelection();
  else if (document.selection) return document.selection.createRange().text;
  return "";
};
