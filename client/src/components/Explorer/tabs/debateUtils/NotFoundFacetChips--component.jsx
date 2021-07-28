import React, { Fragment, useEffect, useState } from "react";
import { CUSTOMER } from "../../../../constants";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

function NotFoundFacetChips({ facetType, valueName, removeFacet, lang }) {
  // https://codepen.io/hansmaad/pen/QGYpey/?html-preprocessor=markdown
  const [valueFacet, setValueName] = useState("");
  const [valueFacetType, setFacetType] = useState("");
  useEffect(() => {
    setFacetType(facetType);
    setValueName(valueName);
  }, []);

  function removeFacetChip() {
    removeFacet(valueFacet, valueFacetType);
    setValueName("");
    setFacetType("");
  }
  function debateTypeExt(value, language) {
    if (value === "part1") {
      return language === "ENG"
        ? "Question & Answers [Part1]"
        : "ಭಾಗ-1: ಪ್ರಶ್ನೋತ್ತರ";
    } else if (value === "part2") {
      return language === "ENG"
        ? "Other than Q & A [Part2]"
        : "ಭಾಗ-2: ಪ್ರಶ್ನೋತ್ತರವನ್ನು ಹೊರತುಪಡಿಸಿ ಇತರೆ ವಿಷಯಗಳ ಮೇಲೆ ಚರ್ಚೆ";
    } else {
      return value;
    }
  }

  return (
    <Fragment>
      <Tippy
        arrow={true}
        placement="right"
        content={
          <span style={{ fontWeight: "bold" }}>
            Click on 'X' to Remove Filter
          </span>
        }
      >
        <div className={CUSTOMER === "KLA" ? "md-chip--kla" : "md-chip--klc"}>
          <span>
            {facetType} : {debateTypeExt(valueName, lang)}
          </span>
          <button
            type="button"
            className={
              CUSTOMER === "KLA" ? "md-chip-remove--KLA" : "md-chip-remove--KLC"
            }
            onClick={(e) => removeFacetChip()}
          ></button>
        </div>
      </Tippy>
    </Fragment>
  );
}

export default NotFoundFacetChips;
