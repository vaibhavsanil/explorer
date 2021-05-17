import React from "react";

function FacetItem({
  itemHeader,
  docCount,
  value,
  facetType,

  itemCheckFunction,
}) {
  // console.info(`[DEBUG] from Facet Item is ${itemHeader} ${docCount} ${value}`);
  function itemCheck(e, type) {
    // Calling the props function to handle on Change
    // console.info(
    //   `The itemCheck function for ${facetType} is called for ${e.target.value} & it is ${e.target.checked}`
    // );
    // console.info(`The itemCheck function for ${type} is ${itemCheckFunction}`);
    itemCheckFunction(e, type);
  }

  return (
    <div className="facetItem">
      <label>
        <input
          onChange={(e) => itemCheck(e, facetType)}
          type="checkbox"
          value={value}
        />
        <span>{`${itemHeader} (${docCount})`}</span>
      </label>
    </div>
  );
}

export default FacetItem;
