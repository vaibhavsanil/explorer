import React, { useContext, useState, useEffect } from "react";
import DebateContext from "../../../../context/Debates/debateContext";
import { returnQueryVariableFilter } from "../../../../constants";

function FacetItem({
  itemHeader,
  docCount,
  value,
  facetType,
  language,

  itemCheckFunction,
}) {
  // Called the Context Api

  const debateContext = useContext(DebateContext);
  const [checked, setChecked] = useState(false);

  // https://stackoverflow.com/questions/32174317/how-to-set-default-checked-in-checkbox-reactjs

  // console.info(
  //   `[DEBUG] Check the value of lang from the facet item ${language}  `
  // );

  const {
    debateQueryObj,
    addSearchQueryFormat,
    removeSearchQueryFormat,
    errorSearchQueryFormat,
    manipulateQuery,
    searchRequestExplorerProm,
    addLoading,
    removeLoading,
    addError,
    removeError,
  } = debateContext;

  useState(() => {
    isChecked(debateQueryObj, language, facetType);
  }, []);

  function itemCheck(e, type, lang) {
    // Calling the props function to handle on Change
    // console.info(
    //   `The itemCheck function for ${facetType} is called for ${e.target.value} & it is ${e.target.checked}`
    // );
    // console.info(`The itemCheck function for ${type} is ${itemCheckFunction}`);
    // console.info(
    //   `[DEBUG] The itemCheck function for ${type} is ${itemCheckFunction}`
    // );
    // itemCheckFunction(e, type);

    const itemCheckArray = returnQueryVariableFilter(type);
    setChecked(!checked);
    // Add Loading
    addLoading();
    manipulateQuery(e, lang, itemCheckArray, debateQueryObj);
    searchRequestExplorerProm(debateQueryObj)
      .then((res) => {
        removeLoading();
      })
      .catch((err) => {
        addError(err);
      });
  }

  function isChecked(stateglobal, lang, type) {
    // This function is to check whether the user has clicked the item
    const itemCheckArray = returnQueryVariableFilter(type);

    if (itemCheckArray[1] === "string") {
      if (stateglobal[itemCheckArray[0]] === value) {
        setChecked(true);
      }
    } else {
      if (itemCheckArray[1] === "array" && itemCheckArray.length === 2) {
        if (stateglobal[itemCheckArray[0]].includes(value)) {
          setChecked(true);
        }
      } else {
        const setBool =
          lang === "ENG"
            ? stateglobal[itemCheckArray[1]].includes(value)
            : stateglobal[itemCheckArray[2]].includes(value);

        if (setBool) {
          setChecked(true);
        }
      }
    }
  }

  return (
    <div className="facetItem">
      <label>
        <input
          onChange={(e) => itemCheck(e, facetType, language)}
          defaultChecked={checked}
          type="checkbox"
          value={value}
          autocomplete="off"
        />
        <span>{`${itemHeader} (${docCount})`}</span>
      </label>
    </div>
  );
}

export default FacetItem;
