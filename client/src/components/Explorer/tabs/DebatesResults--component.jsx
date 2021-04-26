import React, { useEffect, Fragment, useState, useContext } from "react";
import CollapsibleCard from "./debateUtils/Collapsible--component";

import { CUSTOMER, addHiglightToTab, i18n } from "../../../constants/index";

// Import Context
import DebateContext from "../../../context/Debates/debateContext";

function DebatesResults({ lang }) {
  const tabType = "debate";
  const debateContext = useContext(DebateContext);

  const { debatesearchResult } = debateContext;

  useEffect(() => {
    addHiglightToTab(tabType);

    return function cleanup() {
      //removeHiglightToTab();
      addHiglightToTab(tabType);
    };
  }, []);

  useEffect(() => {}, [debatesearchResult]);

  const { analysis } = debatesearchResult;

  return (
    <>
      <div className="debate-result--container">
        <div className="debate-result-facet--container">
          <CollapsibleCard
            type="debateType"
            lang={lang}
            header={i18n.debateType}
            dataFacetEng={analysis ? analysis.debateType_bucket.buckets : []}
          />
          <CollapsibleCard
            lang={lang}
            header={i18n.assemblyNumber}
            dataFacetEng={
              analysis ? analysis.assemblyNumber_bucket.buckets : []
            }
            dataFacetKan={
              analysis ? analysis.assemblyNumber_bucket.buckets : []
            }
          />
        </div>
        <div className="debate-result-resultPage--container">
          <div className="debate-result-filterView--container">
            This is Filter View Container
          </div>
          <div className="debate-result-resultPage-displayResults--container">
            This is Results View Container
          </div>
        </div>
      </div>
    </>
  );
}

export default DebatesResults;
