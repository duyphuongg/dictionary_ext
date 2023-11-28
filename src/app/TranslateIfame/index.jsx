import { useEffect, useMemo, useState } from "react";
import { getSelectedText } from "~/utils/dblclick-translate";
import { StyledTranslate } from "./styled.js";

const TranslateIfame = () => {
  const [content, setContent] = useState("");

  const handleContent = () => {
    const text = getSelectedText();
    if (text) {
      setContent(text);
    }
  };

  const urlTranslate = useMemo(() => {
    if (content) {
      return `https://dictionary.cambridge.org/dictionary/english-vietnamese/${content}`;
    }
    return "";
  }, [content]);

  useEffect(() => {
    const bodyEle = document.body;
    bodyEle.addEventListener("mouseup", handleContent);
    return () => {
      bodyEle.removeEventListener("mouseup", handleContent);
    };
  }, []);

  useEffect(() => {
    console.log(222, content);
  }, [content]);

  return urlTranslate ? (
    <StyledTranslate>
      <iframe src={urlTranslate}></iframe>
    </StyledTranslate>
  ) : null;
};

export default TranslateIfame;
