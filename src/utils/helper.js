import axios from "axios";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";

export function regexNumber(str) {
  const regexNumber = str.match(/\d+/g);
  if (!regexNumber || regexNumber.length === 0) return undefined;
  return parseInt(regexNumber.join(""));
}

export function detectProductId(source) {
  try {
    if (isProductItemAE(source)) {
      const url = new URL(source);
      const temp = regexNumber(url.pathname);
      return temp;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/**
 * @param {string} source Example: URL
 * @return Boolean
 */
export function isProductItemAE(source) {
  try {
    source = source ? source : window.location.href;
    // convert URL ver1 -> ver3
    const regex = /i(tem)?\/(.*?)\//i;
    source = source.replace(regex, "item/");

    const patt =
      /^((https?:)?\/\/)([a-zA-Z0-9]+)?(.?aliexpress.)[a-zA-Z]+\/i(tem)?\/[0-9]+(.html)/g;
    return patt.test(source);
  } catch (error) {
    return false;
  }
}

export async function generateLinkAffiliate({ productIds }, sendResponse) {
  try {
    const promotionList = productIds.map(async (item) => {
      let productId = item;
      let promotions = await getPromotionLinks({ productId });

      if (promotions && promotions[productId]) {
        const promotionAff = await parsePromotionLink(promotions[productId]);
        
        if (promotionAff) {
          return { [productId]: promotionAff };
        }
      }
    });

    let promiseResults = await Promise.all(promotionList);

    if (promiseResults && sendResponse) {
      let results = {};
      promiseResults = promiseResults.filter(Boolean);
      if (promiseResults.length) {
        promiseResults.forEach((item) => {
          // results = { ...results, ...item };
          results = Object.assign({}, results, item);
        });
        sendResponse(results);
      } else {
        sendResponse(null);
      }
    }
  } catch (error) {
    if (sendResponse) {
      sendResponse(null);
    }
  }
}

export const API_NODE = "https://minion.alihunter.io";

async function getPromotionLinks({ productId, fullUrl }) {
  try {
    // productId is new
    let promotions = null;
    const url = `${API_NODE}/promotion-generate?productId=${productId}&subid=AR`;
    const { data } = await axios({
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
        "Content-From": "*.aliexpress",
      },
      adapter: fetchAdapter,
    });

    if (data && data.promotion_link) {
      // Object.assign(promotionLinks, { [productId]: data.promotion_link });
      promotions = { [productId]: data.promotion_link };
    }

    return promotions;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function parsePromotionLink(url) {
  try {
    const result = await fetch(url);

    if (result && result.status && result.url) {
      return result.url;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export function addScriptToDom(script_file, request, sendResponse) {
  // Them trackingId cho trang AE
  try {
    const { tabId } = request;

    function addScript(file_name) {
      const nullthrows = (v) => {
        if (v == null) throw new Error("it's a null");
        return v;
      };

      function injectCode(src) {
        const script = document.createElement("script");
        // This is why it works!
        script.src = src;
        script.onload = function () {
          console.log("script loaded", file_name);
        };

        // This script runs before the <head> element is created,
        // so we add the script to <html> instead.
        nullthrows(document.head || document.documentElement).appendChild(
          script,
        );
      }
      injectCode(chrome.runtime.getURL(`/assets/${file_name}`));
    }

    chrome.scripting.executeScript(
      {
        target: { tabId },
        func: addScript,
        args: [script_file],
      },
      () => {
        if (chrome.runtime.lastError) {
          console.log("Error", chrome.runtime.lastError.message);
        }
      },
    );
    sendResponse(true);
  } catch (error) {
    console.log("Error addScriptToDom", error);
  }
}

