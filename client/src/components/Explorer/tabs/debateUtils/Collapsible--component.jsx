import React, { useEffect, useState } from "react";
import { CUSTOMER, i18n } from "../../../../constants/index";
import FacetItem from "./FacetItem--component";

function Collapsible({ header, lang, type, dataFacetEng, dataFacetKan }) {
  useEffect(() => {
    addEventListenerCard();
  }, []);
  // console.info(`[DEBUG] The Header is ${header}`);
  const [inputSearch, setInput] = useState("");
  const [facetValue, setFacetValue] = useState();

  useEffect(() => {
    if (type === "debateType") {
      let dataFacet = lang === "ENG" ? dataFacetEng : dataFacetEng;
      let filteredValue = dataFacetEng.filter((item) => {
        return item.key.includes(inputSearch);
      });
      setFacetValue(filteredValue);
    } else {
      let dataFacet = lang === "ENG" ? dataFacetEng : dataFacetKan;
      let filteredValue = dataFacetEng.filter((item) => {
        return item.key.includes(inputSearch);
      });
      setFacetValue(filteredValue);
    }
  }, [inputSearch]);

  // console.info(
  //   `[DEBUG] The value of the filetered value is \n ${JSON.stringify(
  //     facetValue
  //   )}`
  // );
  function onChange(e) {
    setInput(e.target.value);
  }

  function renderDebateType(debateFacet, ItemJsx, lang) {
    function renderDebateHeader(headerType, lang) {
      if (lang === "ENG") {
        let headerEng =
          headerType === "part1"
            ? "Question & Answers (Part1)"
            : "Other than Question & Answers (Part2)";
        return headerEng;
      } else {
        let headerKan =
          headerType === "part1"
            ? "ಭಾಗ-1: ಪ್ರಶ್ನೋತ್ತರ"
            : "ಭಾಗ-2: ಪ್ರಶ್ನೋತ್ತರವನ್ನು ಹೊರತುಪಡಿಸಿ ಇತರೆ ವಿಷಯಗಳ ಮೇಲೆ ಚರ್ಚೆ";
        return headerKan;
      }
    }
    // console.info(
    //   `[DEBUG] The value of the debate facet is \n ${JSON.stringify(
    //     debateFacet
    //   )}`
    // );

    return facetValue.map((item) => {
      const { key, doc_count } = item;

      if (doc_count === 0) {
        return;
      }
      return (
        <ItemJsx
          itemHeader={renderDebateHeader(key, lang)}
          docCount={doc_count}
          value={key}
        />
      );
    });
  }

  function renderOtherType(debateFacetEng, debateFacetKan, ItemJsx, lang) {
    // console.info(
    //   `[DEBUG] The value of the other debate facet is \n ${JSON.stringify(
    //     debateFacet
    //   )}`
    // );

    let debateFacet = lang === "ENG" ? debateFacetEng : debateFacetKan;
    return facetValue.map((item) => {
      const { key, doc_count } = item;
      if (doc_count === 0) {
        return;
      }
      return <ItemJsx itemHeader={key} docCount={doc_count} value={key} />;
    });
  }

  function addEventListenerCard() {
    var coll = document.getElementsByClassName(
      CUSTOMER === "KLA" ? "collapsible--kla" : "collapsible--klc"
    );
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.visibility === "visible") {
          // content.style.display = "none";
          content.style.visibility = "hidden";
        } else {
          // content.style.display = "block";
          content.style.visibility = "visible";
        }
      });
    }
  }

  return (
    <div className="collapsibleContainer">
      <button
        type="button"
        className={CUSTOMER === "KLA" ? "collapsible--kla" : "collapsible--klc"}
      >
        {lang === "ENG" ? header.eng : header.kan}
      </button>
      <div class="content">
        <form
          action=""
          style={{
            padding: "0.5rem 1rem",
          }}
        >
          <input
            className="collapsibleInput"
            type="text"
            onChange={(e) => setInput(e.target.value)}
          />
        </form>
        <div className="facetContainer">
          {type === "debateType"
            ? renderDebateType(dataFacetEng, FacetItem, lang)
            : renderOtherType(dataFacetEng, dataFacetKan, FacetItem, lang)}
        </div>
      </div>
    </div>
  );
}

export default Collapsible;
