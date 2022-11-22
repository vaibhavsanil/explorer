import React, { useEffect, Fragment, useState, useContext } from "react";
import CollapsibleCard from "./debateUtils/Collapsible--component";
import FacetFilterContainer from "./DebateResults/FacetFilterContainer";
import SearchInfo from "./DebateResults/SearchInfo--component";
import CalenderDebate from "./DebateResults/Calender-Debate--component";
import NotFound404 from "./debateUtils/NotFound404--component";
import DebateResultContainer from "./DebateResults/DebateResultCard/DebateResultContainer--component";
import { Scrollbars } from "react-custom-scrollbars";

import {
  CUSTOMER,
  addHiglightToTab,
  i18n,
  searchQueryConst,
  searchConstQueryObject,
} from "../../../constants/index";

// Import Context
import DebateContext from "../../../context/Debates/debateContext";
import FacetLoading from "./DebateResults/FacetLoading--component";
function DebatesResults({ lang, searchTerm }) {
  const tabType = "debate";
  const debateContext = useContext(DebateContext);
  const [searchState, setSearch] = useState(searchQueryConst);

  const { debatesearchResult, loading, addSearchQueryFormat, debateQueryObj } =
    debateContext;

  useEffect(() => {
    addHiglightToTab(tabType);

    return function cleanup() {
      //removeHiglightToTab();
      addHiglightToTab(tabType);
    };
  }, []);

  useEffect(() => {}, [debatesearchResult]);
  const { analysis, debateResults } = debatesearchResult;

  const notFoundRender = (lang) => {
    return <NotFound404 lang={lang} results={debateResults} />;
  };

  return (
    <>
      {debateResults && debateResults.length === 0 ? (
        notFoundRender(lang)
      ) : (
        <div className="debate-result--container">
          <div className="debate-result-facet--container">
            <Scrollbars style={{ width: "100%", height: "100%" }}>
              {analysis && (
                <CollapsibleCard
                  type="debateType"
                  lang={lang}
                  header={i18n.debateType}
                  dataFacetEng={
                    analysis ? analysis.debateType_bucket.buckets : []
                  }
                  dataFacetKan={
                    analysis ? analysis.debateType_bucket.buckets : []
                  }
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
                dataFacetEng={
                  analysis ? analysis.sessionNumber_bucket.buckets : []
                }
                dataFacetKan={
                  analysis ? analysis.sessionNumber_bucket.buckets : []
                }
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
                dataFacetEng={
                  analysis ? analysis.yearFilter_bucket.buckets : []
                }
                dataFacetKan={
                  analysis ? analysis.yearFilter_bucket.buckets : []
                }
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
            </Scrollbars>
          </div>

          <div className="debate-result-resultPage--container">
            <div className="debate-result-filterView--container">
              <FacetFilterContainer lang={lang} />
              <div className="filterInfoContainer">
                <div className="loadingResultsInfo">
                  {loading ? <FacetLoading lang={lang} /> : <SearchInfo />}
                </div>
                <div className="dateSelector">
                  <CalenderDebate />
                </div>
              </div>
            </div>
            <DebateResultContainer
              debateResultsObject={debatesearchResult}
              loading={loading}
              lang={lang}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default DebatesResults;
