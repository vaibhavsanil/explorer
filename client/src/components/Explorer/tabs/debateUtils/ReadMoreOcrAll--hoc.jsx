import React, { useEffect, useState } from "react";
import Parse from "html-react-parser";

function ReadMoreOcrAll({ ocrData }) {
  const [displayBlock, setDisplay] = useState(true);
  const [showBlock, setShowBlock] = useState(false);
  useState(() => {
    if (ocrData === "No Result") {
      setDisplay(false);
    }
  }, []);
  useEffect(() => {
    // if (ocrData === "No Result") {
    //   //   console.info(`[DEBUG] The ocr result is ${ocrData}`);
    //   let contentDiv = document.getElementsByClassName("expandMoreContent");
    //   for (let content in contentDiv) {
    //     console.info(
    //       `[DEBUG] The value of content Div is ${contentDiv[content].style.display}`
    //     );
    //     contentDiv[content].style.display = "none";
    //   }
    // }
  }, []);
  const BLOCK = { display: "block" };
  const NONE = { display: "none" };

  const showRemainingBlock = (ocrdata) => {
    if (displayBlock) {
      if (ocrdata.length > 1) {
        const sliceData = ocrdata.slice(1);
        if (sliceData instanceof Array) {
          return sliceData.map((item) => {
            return <p>{Parse(item)}</p>;
          });
        } else {
          return;
        }
      }
    }
  };
  return (
    <>
      <div
        class="expandMoreContent"
        id="showMoreContent1"
        style={displayBlock ? BLOCK : NONE}
      >
        <p>{Parse(ocrData[0])}</p>

        {showBlock ? showRemainingBlock(ocrData) : ""}
        {ocrData.length > 1 && (
          <span
            onClick={(e) => {
              setShowBlock(!showBlock);
            }}
            className="btn-expand-more"
          >
            {showBlock ? "Show Less" : "...Show More"}
          </span>
        )}
      </div>
    </>
  );
}

export default ReadMoreOcrAll;
