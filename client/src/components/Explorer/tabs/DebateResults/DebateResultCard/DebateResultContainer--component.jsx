import React, { useEffect, Fragment, useState, useRef } from "react";
import SelectSort from "../../../../common/sortSelectElement--component";
import ResultCard from "../../DebateResults/DebateResultCard/ResultCard--component";
import { Scrollbars } from "react-custom-scrollbars";
import ScrollTop from "../../debateUtils/Scroll-Top--component";

// import NotFound404 from "../../debateUtils/NotFound404--component";
import { CUSTOMER } from "../../../../../constants/index";
function DebateResultContainer({ debateResultsObject, loading, lang }) {
  const [sortResults, sortstateFunc] = useState();
  const [scrollY, setScrolly] = useState(0);
  const { debateResults } = debateResultsObject;

  useEffect(() => {
    sortstateFunc(debateResults);
  }, []);

  // useEffect(() => {
  //   // console.info(`[DEBUG][OFFSET][MAIN] is y ${yoffset}`);
  // }, [yoffset]);

  // console.info(
  //   `[DEBUG] the value of debateResults is ${JSON.stringify(
  //     debateResultsObject
  //   )}`
  // );

  const ascendResults = (results, type) => {
    let sortedresult = results.sort((a, b) => {
      let fromDate = a["_source"]["debate_section_date"].split("-");
      let toDate = b["_source"]["debate_section_date"].split("-");

      let from = new Date(fromDate[0], fromDate[1], fromDate[2]);
      let to = new Date(toDate[0], toDate[1], toDate[2]);

      if (type === "asc") {
        return from - to;
      } else if (type === "desc") {
        return to - from;
      }
    });

    return sortedresult;
  };

  function changeSortFunc(e) {
    // https://stackoverflow.com/questions/45295962/sorting-date-with-time-in-descending-order-in-javascript

    if (e.target.value === "asc") {
      let resultsAsc = ascendResults(debateResults, "asc");
      // console.info(
      //   `[DEBUG] the value of change sort function is ${resultsAsc} `
      // );
      sortstateFunc(resultsAsc);
    } else if (e.target.value === "dsc") {
      let resultsDsc = ascendResults(debateResults, "desc");

      sortstateFunc(resultsDsc);
    } else if (e.target.value === "rel") {
      sortstateFunc(debateResults);
    }
    // console.info(
    //   `[DEBUG] the value of change sort function is DebateResults ${JSON.stringify(
    //     debateResults
    //   )}`
    // );
  }

  const scrollTop = () => {
    // console.log(`[DEBUG][SCROLL TOP] The position of the scroll y  called }`);
    var scrollElement = document.getElementById("resultContainer");
    // https://stackoverflow.com/questions/10744299/scroll-back-to-the-top-of-scrollable-div
    // scrollElement.scrollIntoView();
    scrollElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // / resultContain.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollPos = (e) => {
    var position = document.getElementById("resultContainer").scrollTop;
    // console.log(`[DEBUG][SCROLL] The position of the scroll y is ${position}`);
    setScrolly(position);
  };

  // {debateResults &&
  //         debateResults.map((item) => (
  //           <ResultCard lang={lang} cardData={item} />
  //         ))}

  return (
    <div className="debate-result-resultPage-displayResults--container">
      <div className="debate-result-resultPage--selectContainer">
        <SelectSort onClick={changeSortFunc} lang={lang} customer={CUSTOMER} />
      </div>
      {/* <Scrollbars style={{ width: "100%", height: "100%" }}> */}
      <div
        id="resultContainer"
        className="resultsContainer"
        onScroll={(e) => scrollPos(e)}
      >
        {sortResults &&
          sortResults.map((item) => <ResultCard lang={lang} cardData={item} />)}
      </div>
      <ScrollTop offset={scrollY} parentScrollTop={scrollTop} />
      {/* </Scrollbars> */}
    </div>
  );
}

export default DebateResultContainer;
