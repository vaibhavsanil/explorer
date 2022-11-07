import React, { useEffect, useState } from "react";
import { CUSTOMER, i18n } from "../../../../constants/index";
import FacetItem from "./FacetItem--component";

function Collapsible({ header, lang, type, dataFacetEng, dataFacetKan }) {
  const [inputSearch, setInput] = useState("");
  const [facetValue, setFacetValue] = useState([]);

  useEffect(() => {
    // console.info(`[DEBUG] the use Effect Called for ${type} `);
    dontrenderFacet(type);
    addEventListenerCard();
    var facetData = lang === "ENG" ? dataFacetEng : dataFacetKan;

    setFacetValue(facetData);
  }, []);

  function handleSearch(e) {
    if (type === "debateType") {
      let dataFacet = lang === "ENG" ? dataFacetEng : dataFacetEng;
      // console.info(
      //   `In use Effect the value of dataFacet ${JSON.stringify(dataFacet)}`
      // );
      let filteredValue = dataFacet.filter((item) => {
        return item.key.includes(e.target.value);
      });
      // console.info(
      //   `In use Effect the value of filtered value fr debateType ${JSON.stringify(
      //     filteredValue
      //   )}`
      // );
      setFacetValue(filteredValue);
    } else {
      renderSearchFacet(e);
    }
  }

  function renderSearchFacet(e) {
    let dataFacet = lang === "ENG" ? dataFacetEng : dataFacetKan;
    // console.info(`In use Effect the value of dataFacet ${dataFacet}`);
    let filteredValue = dataFacet.filter((item) => {
      return item.key.includes(e.target.value);
    });

    // console.info(
    //   `In use Effect the value of filtered value fr debateType ${JSON.stringify(
    //     filteredValue
    //   )}`
    // );
    setFacetValue(filteredValue);
  }

  const itemCheckFunc = (e, type) => {
    // This function will carry the checked from the facet item to the global state
    // console.info(`Item Check Function is called !!!`);
    // console.info(
    //   `The item ${e.target.value} is called ${e.target.checked} for ${type}`
    // );
  };

  function dontrenderFacet(type) {
    // console.log(
    //   `[DEBUG] Don Render The data facet length of ${type} is ${JSON.stringify(
    //     dataFacetEng
    //   )}`
    // );
    if (type === "debatePart") {
      return;
    } else {
      if (
        dataFacetEng.length === 0 ||
        dataFacetKan.length === 0 ||
        dataFacetEng[0].key === "N/A"
      ) {
        const facetContainer = document.getElementById(type + "_container");
        facetContainer.style.display = "none";
      } else {
        const facetContainer = document.getElementById(type + "_container");
        facetContainer.style.display = "block";
      }
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

  function renderDebateType(debateFacet, ItemJsx, lang, type, itemCheckFunc) {
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

    return facetValue.map((item) => {
      // console.info(`[DEBUG] from ${type} the item is ${item}`);
      const { key, doc_count } = item;
      // console.info(`The itemCheck function for ${type} is ${itemCheckFunc}`);

      if (doc_count === "0") {
        return;
      }
      return (
        <ItemJsx
          language={lang}
          itemHeader={renderDebateHeader(key, lang)}
          docCount={doc_count}
          facetType={type}
          value={key}
          itemCheckFunction={itemCheckFunc}
        />
      );
    });
  }

  function renderOtherType(
    debateFacetEng,
    debateFacetKan,
    ItemJsx,
    lang,
    type,
    itemCheckFunc
  ) {
    // console.info(
    //   `[DEBUG] The value of the other debate facet is \n ${JSON.stringify(
    //     debateFacet
    //   )}`
    // );

    let debateFacet = lang === "ENG" ? debateFacetEng : debateFacetKan;
    return facetValue.map((item) => {
      const { key, doc_count } = item;
      // console.info(`from Collapse componenet ${type}`);
      if (doc_count === 0 || key === "N/A") {
        return;
      }
      return (
        <ItemJsx
          itemHeader={key}
          facetType={type}
          docCount={doc_count}
          value={key}
          itemCheckFunction={itemCheckFunc}
          language={lang}
        />
      );
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
            onChange={(e) => handleSearch(e)}
          />
        </form>
        <div className="facetContainer">
          {type === "debateType"
            ? renderDebateType(
                dataFacetEng,
                FacetItem,
                lang,
                type,
                itemCheckFunc
              )
            : renderOtherType(
                dataFacetEng,
                dataFacetKan,
                FacetItem,
                lang,
                type,
                itemCheckFunc
              )}
        </div>
      </div>
    </div>
  );
}

export default Collapsible;
