import {
  BG_COLOR,
  TEXT_COLOR,
  BG_COLOR_DEFAULT,
  TEXT_COLOR_DEFAULT,
  POSITION,
  POSITION_DEFAULT
} from "./constant";

export async function getStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => resolve(result));
  });
}

export async function setStorage(data) {
  return new Promise((resolve) => {
    chrome.storage.local.set(data, () => resolve(true));
  });
}

export async function removeStorage(key) {
  return new Promise((resolve) => {
    chrome.storage.local.remove([key], () => resolve(true));
  });
}

export async function clearStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.clear(() => resolve(true));
  });
}

const pDisplayTime = async (eleAppend = null) => {
  const elementWrap = document.createElement("div");
  const elementStyle = document.createElement("style");
  const bgColorStorage = await getStorage(BG_COLOR);
  const textColorStorage = await getStorage(TEXT_COLOR);
  const positionStorage = await getStorage(POSITION);
  const bgColor = bgColorStorage[BG_COLOR] || BG_COLOR_DEFAULT;
  const textColor = textColorStorage[TEXT_COLOR] || TEXT_COLOR_DEFAULT;
  const position = positionStorage[POSITION] || POSITION_DEFAULT;
  let positionStyle = ""
  switch (position) {
    case "top-right":
      positionStyle = `top: 8px;right: 8px;`
      break;
    case "top-left":
      positionStyle = `top: 8px;left: 8px;`
      break;
    case "bottom-right":
      positionStyle = `bottom: 8px;right: 8px;`
      break;
    case "bottom-left":
      positionStyle = `bottom: 8px;left: 8px;`
      break;
    default:
      positionStyle = `bottom: 8px;left: 8px;`
      break;
  }
  elementWrap.id = "pDisplayTime";
  elementWrap.innerHTML = `
    <p id="vietnamTime"></p>
    <p id="malaysiaTime"></p>
  `;
  elementStyle.innerHTML = `
  #pDisplayTime{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background: ${bgColor};
    position: fixed;
    padding: 4px 8px;
    border-radius: 4px;
    z-index: 99;
    ${positionStyle}
  }
  #pDisplayTime p{
    margin: 0;
    font-size: 14px;
    color: ${textColor}
  }
  `;

  console.log(3333, eleAppend);
  document.head.appendChild(elementStyle);
  eleAppend ? eleAppend.appendChild(elementWrap) : document.body.appendChild(elementWrap);
};

const handlePTime = () => {
  const localTime = new Date();
  const vietnamTimeElement = document.getElementById("vietnamTime");
  const malaysiaTimeElement = document.getElementById("malaysiaTime");

  const optionsMY = { timeZone: "Asia/Kuala_Lumpur", timeZoneName: "short" };
  const malaysiaTime = localTime.toLocaleTimeString("vi-VN", optionsMY);

  const optionsVN = { timeZone: "Asia/Ho_Chi_Minh", timeZoneName: "short" };
  const vietnamTime = localTime.toLocaleTimeString("vi-VN", optionsVN);

  vietnamTimeElement.textContent = `VN: ${vietnamTime}`;
  malaysiaTimeElement.textContent = `MY: ${malaysiaTime}`;
};

export const run = async (eleAppend) => {
  await pDisplayTime(eleAppend);
  setInterval(function () {
    handlePTime();
  }, 1000);
};
