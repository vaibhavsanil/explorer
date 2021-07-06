import React, { useState, useEffect } from "react";

function ReadMore({ children, maxCharacterCount = 250 }) {
  const text = children;

  const [isTruncated, setIsTruncated] = useState(true);
  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

  function toggleIsTruncated() {
    setIsTruncated(!isTruncated);
  }

  const openRequestPDF = () => {
    //https://stackoverflow.com/questions/47406344/how-to-open-a-page-in-new-tab-on-click-of-a-button-in-react-i-want-to-send-some/61708073
    // route to new page by changing window.location
    // window.open(newPageUrl, "_blank"); //to open new page
    console.info(`[DEBUG][CALLING PDF] the pdf is called !!`);
  };
  //   https://www.youtube.com/watch?v=kcqwE_8bynE&ab_channel=CodewithBhargav
  return (
    <h4 id="debateSubject" onClick={openRequestPDF}>
      {resultString}
      {text.length < maxCharacterCount ? (
        ""
      ) : (
        <>
          <span> {isTruncated ? "..." : " "}</span>
          <span
            id="readMoreButton"
            onClick={toggleIsTruncated}
            className="tagButton"
            style={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isTruncated ? " Read More" : " Read Less"}
          </span>
        </>
      )}
    </h4>
  );
}

export default ReadMore;
