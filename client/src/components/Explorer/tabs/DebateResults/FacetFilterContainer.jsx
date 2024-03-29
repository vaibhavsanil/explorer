import React, { Fragment, useEffect, useContext } from "react";
import FacetChips from "../debateUtils/FacetChips--component";
import DebateContext from "../../../../context/Debates/debateContext";
import { toast } from "react-toastify";
import {
  filterMappingObject,
  CUSTOMER,
  filterRemoveKeysObject,
  filterMappingObjectForKey,
  returnObjRemoveQuery,
  dateFormat,
} from "../../../../constants/index";

function FacetFilterContainer({ lang }) {
  const debateContext = useContext(DebateContext);
  const {
    debateQueryObj,
    searchRequestExplorerProm,
    addSearchQueryFormat,
    addLoading,
    removeLoading,
  } = debateContext;

  useEffect(() => {
    // renderFacets(queryFiltered, FacetChips);
    // console.info(
    //   `[DEBUG] the facet value array is ${renderFacets(
    //     debateQueryObj,
    //     FacetChips
    //   )} `
    // );
  }, [debateQueryObj, lang]);
  function removeFacet(value, facettype) {
    //[TODO]  Remove Facet Type
    // Add Loading to global state
    // console.info(`[DEBUG] from removeFacet the ${value} && ${facettype}`);
    addLoading();
    let queryObjectKey;
    let updatedQuery;
    if (facettype === "Date") {
      queryObjectKey = ["sectionDateFrm", "sectionDateTo"];
      let queryCopy = debateQueryObj;

      for (let index in queryObjectKey) {
        const key = queryObjectKey[index];
        queryCopy[key] = "";
      }
      updatedQuery = queryCopy;
    } else {
      queryObjectKey = filterMappingObjectForKey(lang, facettype);

      updatedQuery = returnObjRemoveQuery(
        queryObjectKey,
        debateQueryObj,
        value
      );
    }

    // console.info(
    //   `[DEBUG][REMOVE] The facet filter remove is called for ${value} && type is ${queryObjectKey}!!! the value of query is \n ${JSON.stringify(
    //     updatedQuery
    //   )} `
    // );
    addSearchQueryFormat(updatedQuery);
    searchRequestExplorerProm(updatedQuery)
      .then((res) => {
        removeLoading();
      })
      .catch((err) => {
        toast.error(
          "Connection to the Server Failed !!! Please Contact System Administrator"
        );
        removeLoading();
      });
    return;
  }

  const notAllowedKey = ["qt", "qp", "ln"];
  // Filter the Query Objects
  let queryFiltered = filterRemoveKeysObject(debateQueryObj, notAllowedKey);
  let facetItems = [];
  let dateItems = [];
  function renderFacets(queryObj, FacetJsx) {
    // Render throught the queryObj & check for each element if its a string or array

    for (const item in queryObj) {
      let facetTYPE = filterMappingObject(lang, item);
      if (queryObj[item] instanceof Array && queryObj[item].length > 0) {
        // Do Array Proccessing

        queryObj[item].map((facetItem) => {
          const itemToPush = [facetTYPE, facetItem];
          facetItems.push(itemToPush);
        });
      } else {
        // Return String
        if (item === "sectionDateFrm" || item === "sectionDateTo") {
          if (debateQueryObj[item] !== "") {
            const date =
              item === "sectionDateFrm"
                ? ["date-from", debateQueryObj[item]]
                : ["date-to", debateQueryObj[item]];
            dateItems.push(date);

            if (dateItems.length > 1) {
              const datefacetHeader = lang === "ENG" ? "Date" : "ದಿನಾಂಕ";
              // console.info(`[DEBUG] from date format ${dateItems}`);
              const formatedDateFrom = dateFormat(dateItems[0][1]);
              const formatedDateTo = dateFormat(dateItems[1][1]);
              // if date-from & date-to are equal push

              if (formatedDateFrom === formatedDateTo) {
                const facetToPush = [datefacetHeader, formatedDateFrom];
                facetItems.push(facetToPush);
              } else {
                const facetToPush = [
                  datefacetHeader,
                  `${formatedDateFrom} to ${formatedDateTo}`,
                ];
                facetItems.push(facetToPush);
              }
            }
          }
        }
        if (
          queryObj[item].length > 0 &&
          item !== "sectionDateFrm" &&
          item !== "sectionDateTo"
        ) {
          const itemToPushString = [facetTYPE, debateQueryObj[item]];
          facetItems.push(itemToPushString);
        }
      }
    }

    return facetItems.map((facetItem) => {
      return (
        <FacetJsx
          facetType={facetItem[0]}
          valueName={facetItem[1]}
          removeFacet={removeFacet}
          lang={lang}
        />
      );
    });
  }
  return (
    <>
      <div className="facet-filter-view">
        {renderFacets(queryFiltered, FacetChips)}
      </div>
    </>
  );
}

export default FacetFilterContainer;
