import React, { Fragment, useEffect } from "react";
import { CUSTOMER } from "../../../../constants/index";

function FacetLoading({ lang }) {
  useEffect(() => {}, []);

  function changeColumnColor(customer) {
    let colour =
      customer === "KLA"
        ? "rgba(11, 212, 21, 0.979) transparent transparent transparent"
        : "rgba(219, 61, 9, 0.979) transparent transparent transparent";
    let nodes = document.getElementsByClassName("lds-ring");
    let nodes1 = nodes.getElementsByTagName("div");

    for (var i = 0; i < nodes1.length; i++) {
      nodes[i].style.borderColor = colour;
    }
  }

  return (
    <>
      <div className="facet--loading">
        <div className={CUSTOMER === "KLA" ? "lds-ring--kla" : "lds-ring--klc"}>
          <div />
          <div />
          <div />
          <div />
        </div>

        <div className="facet--loading-text">
          {lang === "ENG" ? "Loading ..." : "ಲೋಡ್ ಆಗುತ್ತಿದೆ ..."}{" "}
        </div>
      </div>
    </>
  );
}

export default FacetLoading;
