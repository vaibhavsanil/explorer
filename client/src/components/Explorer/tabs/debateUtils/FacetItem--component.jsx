import React from "react";

function FacetItem({ itemHeader, docCount, value }) {
  // console.info(`[DEBUG] from Facet Item is ${itemHeader} ${docCount} ${value}`);

  return (
    <div className="facetItem">
      <label>
        <input type="checkbox" value={value} />
        <span>{`${itemHeader} (${docCount})`}</span>
      </label>
    </div>
  );
}

export default FacetItem;
