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
        onClick={onClick}
      >
        <option value="asc">Date-Latest to Oldest</option>
        <option value="dsc">Date-Oldest to Latest</option>
      </select>
    </>
  );
}

export default selectSortElement;
