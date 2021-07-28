import React, { useState, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

import {
  generateFSPath,
  CUSTOMER,
  FILESERVER_KLA,
  FILESERVER_KLC,
} from "../../../../constants/index";

function ReadMore({ children, maxCharacterCount = 250, data }) {
  const text = children;

  const [isTruncated, setIsTruncated] = useState(true);
  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

  function toggleIsTruncated() {
    setIsTruncated(!isTruncated);
  }

  const openRequestPDF = (src) => {
    //https://stackoverflow.com/questions/47406344/how-to-open-a-page-in-new-tab-on-click-of-a-button-in-react-i-want-to-send-some/61708073
    // route to new page by changing window.location
    // window.open(newPageUrl, "_blank"); //to open new page

    const { startPage, endPage, bookId } = src;

    // console.info(
    //   `[DEBUG][Open Request PDF] the pdf is called \n ${JSON.stringify(data)}`
    // );
    let routesPDF = generateFSPath(
      "debates",
      "section",
      CUSTOMER.toLowerCase(),
      bookId,
      startPage,
      endPage
    );

    let fileserver = CUSTOMER === "KLA" ? FILESERVER_KLA : FILESERVER_KLC;
    let pathFileServer = fileserver + routesPDF;
    // console.info(
    //   `[DEBUG][Open Request PDF] the pdf is called \n ${fileserver + routesPDF}`
    // );

    window.open(pathFileServer, "_blank");
  };
  //   https://www.youtube.com/watch?v=kcqwE_8bynE&ab_channel=CodewithBhargav

  let klastyleToolTip = {
    backgroundColor: "green",
    color: "#ffff",
  };
  return (
    <Tippy
      content={
        <span style={{ fontWeight: "bold" }}>Click to View Debate Section</span>
      }
    >
      <h4 id="debateSubject" onClick={(e) => openRequestPDF(data)}>
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
    </Tippy>
  );
}

export default ReadMore;
