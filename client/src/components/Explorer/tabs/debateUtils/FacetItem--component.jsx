import React, { useContext, useState, useEffect } from "react";
import DebateContext from "../../../../context/Debates/debateContext";
import { returnQueryVariableFilter } from "../../../../constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const {
    debateQueryObj,

    manipulateQuery,
    searchRequestExplorerProm,
    addLoading,
    removeLoading,
    addError,
  } = debateContext;

  useState(() => {
    isChecked(debateQueryObj, language, facetType);
  }, []);

  function itemCheck(e, type, lang) {
    const itemCheckArray = returnQueryVariableFilter(type);
    setChecked(!checked);
    // Add Loading
    addLoading();
    const queryObject = manipulateQuery(
      e,
      lang,
      itemCheckArray,
      debateQueryObj
    );
    searchRequestExplorerProm(queryObject)
      .then((res) => {
        removeLoading();
      })
      .catch((err) => {
        addError(err);
        removeLoading();
        toast.error(
          "Connection to the Server Failed !!! Please Contact System Administrator"
        );
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
        // console.info(
        //   `[DEBUG] from Facet Chips state global ${stateglobal} && ${itemCheckArray[0]} && value ${value} `
        // );
        if (stateglobal[itemCheckArray[0]].includes(value)) {
          setChecked(true);
        }
      } else {
        const setBool =
          lang === "ENG"
            ? stateglobal[itemCheckArray[0]].includes(value)
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
