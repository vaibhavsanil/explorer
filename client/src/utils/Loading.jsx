import React from "react";
import { CUSTOMER } from "../constants/index";

function Loading() {
  return (
    <div
      className={
        CUSTOMER === "KLA" ? "lds-dual-ring--kla" : "lds-dual-ring--klc"
      }
    ></div>
  );
}

export default Loading;
