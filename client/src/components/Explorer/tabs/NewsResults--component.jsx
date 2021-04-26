import React, { useEffect } from "react";
import { CUSTOMER, addHiglightToTab } from "../../../constants/index";

function NewsResults() {
  const tabType = "news";
  useEffect(() => {
    addHiglightToTab(tabType);

    return function cleanup() {
      //removeHiglightToTab();
      addHiglightToTab(tabType);
    };
  }, []);
  return (
    <div>
      <h3>News Results</h3>
    </div>
  );
}

export default NewsResults;
