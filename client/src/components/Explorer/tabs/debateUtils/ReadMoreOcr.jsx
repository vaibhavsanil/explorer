import React, { useState } from "react";

function ReadMoreOcr({ children, maxCharacterCount = 250 }) {
  const text = children;

  const [isTruncated, setIsTruncated] = useState(false);
  const resultString = isTruncated ? text.slice(0, maxCharacterCount) : text;

  function toggleIsTruncated() {
    setIsTruncated(!isTruncated);
  }

  //   https://www.youtube.com/watch?v=kcqwE_8bynE&ab_channel=CodewithBhargav
  return (
    <p id="ocrOutput">
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
    </p>
  );
}

export default ReadMoreOcr;
