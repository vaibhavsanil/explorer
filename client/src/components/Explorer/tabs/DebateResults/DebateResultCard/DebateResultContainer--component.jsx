import React, { useEffect, Fragment, useState } from "react";
import SelectSort from "../../../../common/sortSelectElement--component";
import ResultCard from "../../DebateResults/DebateResultCard/ResultCard--component";
import { CUSTOMER } from "../../../../../constants/index";
function DebateResultContainer({ debateResultsObject, loading, lang }) {
  const [sortResults, sortstateFunc] = useState({});

  function changeSortFunc() {}
  // console.info(
  //   `[DEBUG] the value of debateResults is ${JSON.stringify(
  //     debateResultsObject
  //   )}`
  // );

  const { debateResults } = debateResultsObject;

  return (
    <div className="debate-result-resultPage-displayResults--container">
      <div className="debate-result-resultPage--selectContainer">
        <SelectSort onClick={changeSortFunc} lang={lang} customer={CUSTOMER} />
      </div>
      <div className="resultsContainer">
        {debateResults &&
          debateResults.map((item) => (
            <ResultCard lang={lang} cardData={item} />
          ))}
      </div>
    </div>
  );
}

export default DebateResultContainer;
