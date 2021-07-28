import React, { Fragment } from "react";

function selectSortElement({ onClick, customer, lang }) {
  return (
    <>
      <label for="sort" className="selectLabel">
        {lang === "ENG" ? "Sort" : "ವಿಂಗಡಿಸಿ"}{" "}
      </label>
      <select
        for="sort"
        className={
          customer === "KLA"
            ? "custom-select-KLA menu-select-KLA"
            : "custom-select-KLC menu-select-KLC"
        }
        onClick={(e) => onClick(e)}
      >
        <option value="asc">Date-Oldest to Latest</option>
        <option value="dsc">Date-Latest to Oldest</option>
        <option value="rel">Sort-By Relevance</option>
      </select>
    </>
  );
}

export default selectSortElement;
