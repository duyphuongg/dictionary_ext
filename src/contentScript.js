import { run } from "./helper";
import { getStorage } from "./helper";
import { SHOW_BOTTOM, SHOW_BOTTOM_DEFAULT } from "./constant";

const handleDisplay = async () => {
  const checkShowStorage = await getStorage(SHOW_BOTTOM);
  const isShow = checkShowStorage[SHOW_BOTTOM] || SHOW_BOTTOM_DEFAULT;
  if (isShow) {
    run();
  }
}

handleDisplay()