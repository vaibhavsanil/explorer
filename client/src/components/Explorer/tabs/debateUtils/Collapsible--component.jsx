import React, { useEffect, useState } from "react";
import { CUSTOMER, i18n } from "../../../../constants/index";
import FacetItem from "./FacetItem--component";

function Collapsible({ header, lang, type, dataFacetEng, dataFacetKan }) {
  const [inputSearch, setInput] = useState("");
  const [facetValue, setFacetValue] = useState();
  useEffect(() => {
    dontrenderFacet();
    addEventListenerCard();
  }, []);
  // console.info(`[DEBUG] The Header is ${header}`);

  useEffect(() => {
    if (type === "debateType") {
      let dataFacet = lang === "ENG" ? dataFacetEng : dataFacetEng;
      console.info(`In use Effect the value of dataFacet ${dataFacet}`);
      let filteredValue = dataFacet.filter((item) => {
        return item.key.includes(inputSearch);
      });
      console.info(
        `In use Effect the value of filtered value fr debateType ${JSON.stringify(
          filteredValue
        )}`
      );
      setFacetValue(filteredValue);
    } else {
      renderSearchFacet();
    }
  }, [type, inputSearch]);

  function renderSearchFacet() {
    let dataFacet = lang === "ENG" ? dataFacetEng : dataFacetKan;
    console.info(`In use Effect the value of dataFacet ${dataFacet}`);
    let filteredValue = dataFacet.filter((item) => {
      return item.key.includes(inputSearch);
    });
    setFacetValue(filteredValue);
  }

  function dontrenderFacet() {
    // console.log(`The data facet length of ${type} is ${dataFacetKan}`);
    if (dataFacetEng.length === 0 || dataFacetKan.length === 0) {
      const facetContainer = document.getElementById(type + "_container");
      facetContainer.style.display = "none";
    } else {
      const facetContainer = document.getElementById(type + "_container");
      facetContainer.style.display = "block";
    }
  }

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
    //   `[DEBUG] The value of facet value for type ${type} is \n ${JSON.stringify(
    //     facetValue
    //   )}`
    // );

    return facetValue.map((item) => {
      const { key, doc_count } = item;

      if (doc_count === "0") {
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
      if (doc_count === 0 || key === "N/A") {
        return;
      }
      return <ItemJsx itemHeader={key} docCount={doc_count} value={key} />;
    });
  }

  function addEventListenerCard() {
    // var coll = document.getElementsByClassName(
    //   CUSTOMER === "KLA" ? "collapsible--kla" : "collapsible--klc"
    // );
    var coll = document.getElementById(type + "_button");
    // console.info(`[DEBUG] The value of coll is ${coll} `);
    // for (let i = 0; i < coll.length; i++) {
    // coll.classList.toggle("active");
    coll.addEventListener("click", function () {
      // console.error(`The click function is called !!!`);
      this.classList.toggle("active");
      // console.info(`The value of type is ${type} `);
      const content = document.getElementById(type);

      if (content.style.display === "block") {
        content.style.display = "none";
      } else if (content.style.display === "none") {
        content.style.display = "block";
      } else {
        content.style.display = "block";
      }
      // console.info("The value of content is ", content.style.visibility);
    });
    // }
  }

  return (
    <div id={type + "_container"} className="collapsibleContainer">
      <button
        id={type + "_button"}
        type="button"
        className={CUSTOMER === "KLA" ? "collapsible--kla" : "collapsible--klc"}
      >
        {lang === "ENG" ? header.eng : header.kan}
      </button>
      <div id={type} className="content">
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
