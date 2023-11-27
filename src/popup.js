import { getStorage, setStorage } from "./helper";
import {
  BG_COLOR,
  TEXT_COLOR,
  BG_COLOR_DEFAULT,
  TEXT_COLOR_DEFAULT,
  SHOW_BOTTOM,
  SHOW_BOTTOM_DEFAULT,
  POSITION,
  POSITION_DEFAULT,
} from "./constant";
import { run } from "./helper";

document.addEventListener("DOMContentLoaded", async () => {
  const eleBackgroundColor = document.querySelector("#pBackgroundColor");
  const eleTextColor = document.querySelector("#pTextColor");
  const eleCheckShowBottom = document.querySelector("#pCheckShowBottom");
  const elePosition = document.querySelector("#pPosition");
  const eleBtnApply = document.querySelector("#pApply");
  const eleBtnReset = document.querySelector("#pReset");
  const elePreview = document.querySelector("#pPreview");
  const bgColor = await getStorage(BG_COLOR);
  const textColor = await getStorage(TEXT_COLOR);
  const isShowBottom = await getStorage(SHOW_BOTTOM);
  const position = await getStorage(POSITION);

  bgColor[BG_COLOR]
    ? (eleBackgroundColor.value = bgColor[BG_COLOR])
    : (eleBackgroundColor.value = BG_COLOR_DEFAULT);
  textColor[TEXT_COLOR]
    ? (eleTextColor.value = textColor[TEXT_COLOR])
    : (eleTextColor.value = TEXT_COLOR_DEFAULT);
  isShowBottom[SHOW_BOTTOM] !== undefined
    ? (eleCheckShowBottom.checked = isShowBottom[SHOW_BOTTOM])
    : (eleCheckShowBottom.checked = SHOW_BOTTOM_DEFAULT);
  position[POSITION]
    ? (elePosition.value = position[POSITION])
    : (elePosition.value = POSITION_DEFAULT);

  eleBtnApply?.addEventListener("click", (e) => {
    const bgColor = eleBackgroundColor.value;
    const textColor = eleTextColor.value;
    const isShowBottom = eleCheckShowBottom.checked;
    const position = elePosition.value;

    setStorage({ [BG_COLOR]: bgColor });
    setStorage({ [TEXT_COLOR]: textColor });
    setStorage({ [SHOW_BOTTOM]: isShowBottom });
    setStorage({ [POSITION]: position });
  });

  eleBtnReset?.addEventListener("click", (e) => {
    setStorage({ [BG_COLOR]: BG_COLOR_DEFAULT });
    setStorage({ [TEXT_COLOR]: TEXT_COLOR_DEFAULT });
    setStorage({ [SHOW_BOTTOM]: SHOW_BOTTOM_DEFAULT });
    setStorage({ [POSITION]: POSITION_DEFAULT });
    eleBackgroundColor.value = BG_COLOR_DEFAULT;
    eleTextColor.value = TEXT_COLOR_DEFAULT;
    eleCheckShowBottom.checked = SHOW_BOTTOM_DEFAULT;
    elePosition.value = POSITION_DEFAULT;
  });

  run(elePreview ?? null);
});
