import React, { Fragment, useContext, useEffect } from "react";

// Import Debate Context
import DebateContext from "../../../../context/Debates/debateContext";

function SearchInfo() {
  const debateContext = useContext(DebateContext);
  const { debatesearchResult } = debateContext;

  useEffect(() => {}, [debatesearchResult]);
  const { timeTaken, numberResults } = debatesearchResult;

  function timeTakenConversion(time) {
    return time / 100;
  }
  return (
    <>
      <div className="search--info">
        <b>{numberResults}</b> matching sections found. (
        {timeTakenConversion(timeTaken)} seconds)
      </div>
    </>
  );
}

export default SearchInfo;
