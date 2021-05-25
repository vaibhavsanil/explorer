import React, { useEffect, Fragment, useState, useContext } from "react";
import CollapsibleCard from "./debateUtils/Collapsible--component";

import {
  CUSTOMER,
  addHiglightToTab,
  i18n,
  searchQueryConst,
} from "../../../constants/index";

// Import Context
import DebateContext from "../../../context/Debates/debateContext";

function DebatesResults({ lang, searchTerm }) {
  const tabType = "debate";
  const debateContext = useContext(DebateContext);
  const [searchState, setSearch] = useState(searchQueryConst);

  const { debatesearchResult } = debateContext;

  useEffect(() => {
    addHiglightToTab(tabType);
    // setSearch(...searchState, (searchState["qp"] = searchTerm));
    // console.info(
    //   `[DEBUG] the value of search State is ${JSON.stringify(searchState)} `
    // );
    return function cleanup() {
      //removeHiglightToTab();
      addHiglightToTab(tabType);
    };
  }, []);

  useEffect(() => {}, [debatesearchResult]);
  // useEffect(() => {
  //   setSearch((searchState.qp = searchTerm));
  // }, [searchTerm]);

  const { analysis } = debatesearchResult;

  // console.info(
  //   `[DEBUG] from the Debate Results compoent ${JSON.stringify(searchState)}`
  // );

  return (
    <>
      <div className="debate-result--container">
        <div className="debate-result-facet--container">
          {analysis && (
            <CollapsibleCard
              type="debateType"
              lang={lang}
              header={i18n.debateType}
              dataFacetEng={analysis ? analysis.debateType_bucket.buckets : []}
              dataFacetKan={analysis ? analysis.debateType_bucket.buckets : []}
            />
          )}

          <CollapsibleCard
            type="assemblyNumber"
            lang={lang}
            header={i18n.assemblyNumber}
            dataFacetEng={
              analysis ? analysis.assemblyNumber_bucket.buckets : []
            }
            dataFacetKan={
              analysis ? analysis.assemblyNumber_bucket.buckets : []
            }
          />
          <CollapsibleCard
            type="sessionNumber"
            lang={lang}
            header={i18n.sessionNumber}
            dataFacetEng={analysis ? analysis.sessionNumber_bucket.buckets : []}
            dataFacetKan={analysis ? analysis.sessionNumber_bucket.buckets : []}
          />
          <CollapsibleCard
            type="debateTitle"
            lang={lang}
            header={i18n.debateTitle}
            dataFacetEng={
              analysis ? analysis.debateTitleEng_bucket.buckets : []
            }
            dataFacetKan={
              analysis ? analysis.debateTitleKan_bucket.buckets : []
            }
          />
          <CollapsibleCard
            type="debatePart"
            lang={lang}
            header={i18n.debateParticipants}
            dataFacetEng={
              analysis ? analysis.debateParticiapantsEng_bucket.buckets : []
            }
            dataFacetKan={
              analysis ? analysis.debateParticiapantsKan_bucket.buckets : []
            }
          />
          <CollapsibleCard
            type="year"
            lang={lang}
            header={i18n.year}
            dataFacetEng={analysis ? analysis.yearFilter_bucket.buckets : []}
            dataFacetKan={analysis ? analysis.yearFilter_bucket.buckets : []}
          />
          <CollapsibleCard
            type="issue"
            lang={lang}
            header={i18n.issues}
            dataFacetEng={
              analysis ? analysis.issuesSection_eng_bucket.buckets : []
            }
            dataFacetKan={
              analysis ? analysis.issuesSection_kan_bucket.buckets : []
            }
          />
          <CollapsibleCard
            type="bookId"
            lang={lang}
            header={i18n.bookId}
            dataFacetEng={analysis ? analysis.bookId_bucket.buckets : []}
            dataFacetKan={analysis ? analysis.bookId_bucket.buckets : []}
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
